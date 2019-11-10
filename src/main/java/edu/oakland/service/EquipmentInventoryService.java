package edu.oakland.service;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.oakland.domain.Equipment;
import edu.oakland.domain.Reservation;
import edu.oakland.domain.Reservation_;
import edu.oakland.repository.EquipmentRepository;
import edu.oakland.repository.ReservationRepository;
import edu.oakland.service.dto.AvailableInventoryDTO;

@Service
@Transactional
public class EquipmentInventoryService {

    private final Logger log = LoggerFactory.getLogger(EquipmentInventoryService.class);

    private final EquipmentRepository equipmentRepository;

    private final ReservationRepository reservationRepository;

    public EquipmentInventoryService(EquipmentRepository equipmentRepository,
            ReservationRepository reservationRepository) {
        this.equipmentRepository = equipmentRepository;
        this.reservationRepository = reservationRepository;
    }

    public AvailableInventoryDTO getAvailableInventory(ZonedDateTime startTime, ZonedDateTime endTime) {
        log.debug("Calculating available inventory between start time {} and end time {}", startTime, endTime);
        List<Equipment> equipment = equipmentRepository.findAll();
        Map<Equipment, Integer> inventory = new HashMap<Equipment, Integer>();
        List<Reservation> reservations = reservationRepository
                .findAll(createReservationSepecification(startTime, endTime));
        reservations.sort((r1, r2) -> r1.getStartTime().compareTo(r2.getStartTime())); // order reservations
                                                                                       // chronologically by start time
        // as we iterate over reservations to tally the equipment totals, use this set
        // to track which reservations overlap chronologically
        Set<Reservation> occurringReservations = new HashSet<Reservation>();

        // a running total for usage of equipment types
        Map<Equipment, Integer> usage = new HashMap<Equipment, Integer>();

        // keep track of the peak number of equipment used at a particular time
        Map<Equipment, Integer> peakUsage = new HashMap<Equipment, Integer>();
        reservations.forEach(reservation -> {

            // once a reservation is no longer occurring remove it from the set and remove
            // its contribution to the current usage counts
            occurringReservations.removeIf(occurringRes -> {
                boolean completed = occurringRes.getEndTime().compareTo(reservation.getStartTime()) <= 0;
                if (completed) {
                    occurringRes.getEquipmentReservations().forEach(equipmentRes -> {
                        Equipment eq = equipmentRes.getEquipment();
                        usage.put(eq, usage.get(eq) - equipmentRes.getCount());
                    });
                }
                return completed;
            });

            // mark the current reservation as occurring
            occurringReservations.add(reservation);

            // add the current reservation's equipment count to the total
            reservation.getEquipmentReservations().forEach(equipmentRes -> {
                Equipment eq = equipmentRes.getEquipment();
                if (usage.containsKey(eq)) {
                    usage.put(eq, usage.get(eq) + equipmentRes.getCount());
                } else {
                    usage.put(eq, equipmentRes.getCount());
                }
            });

            // overwrite old peak maximum usages, if applicable
            usage.forEach((eq, count) -> {
                if (peakUsage.containsKey(eq)) {
                    if (count > peakUsage.get(eq)) {
                        peakUsage.put(eq, count);
                    }
                } else {
                    peakUsage.put(eq, count);
                }
            });
        });

        // tabulate the available inventory for each equipment type
        equipment.forEach(eq -> {
            if (peakUsage.containsKey(eq)) {
                inventory.put(eq, eq.getInventorySize() - peakUsage.get(eq));
            } else {
                inventory.put(eq, eq.getInventorySize());
            }
        });

        return new AvailableInventoryDTO(startTime, endTime, inventory);
    }

    private Specification<Reservation> createReservationSepecification(ZonedDateTime startTime, ZonedDateTime endTime) {
        return (root, query, builder) -> {
            // @formatter:off
            return builder.or(
                builder.and(
                    builder.lessThanOrEqualTo(root.get(Reservation_.endTime), endTime),
                    builder.greaterThan(root.get(Reservation_.endTime), startTime)
                ),
                builder.and(
                    builder.greaterThanOrEqualTo(root.get(Reservation_.startTime), startTime),
                    builder.lessThan(root.get(Reservation_.startTime), endTime)
                ),
                builder.and(
                    builder.lessThanOrEqualTo(root.get(Reservation_.startTime), startTime),
                    builder.greaterThanOrEqualTo(root.get(Reservation_.endTime), endTime)
                )
            );
            // @formatter:on
        };
    }

}
