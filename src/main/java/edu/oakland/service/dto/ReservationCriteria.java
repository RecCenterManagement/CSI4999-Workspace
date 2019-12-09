package edu.oakland.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import edu.oakland.domain.enumeration.ReservationStatus;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.ZonedDateTimeFilter;

/**
 * Criteria class for the {@link edu.oakland.domain.Reservation} entity. This class is used
 * in {@link edu.oakland.web.rest.ReservationResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /reservations?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ReservationCriteria implements Serializable, Criteria {
    /**
     * Class for filtering ReservationStatus
     */
    public static class ReservationStatusFilter extends Filter<ReservationStatus> {

        public ReservationStatusFilter() {
        }

        public ReservationStatusFilter(ReservationStatusFilter filter) {
            super(filter);
        }

        @Override
        public ReservationStatusFilter copy() {
            return new ReservationStatusFilter(this);
        }

    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter event;

    private IntegerFilter estimatedParticipants;

    private ZonedDateTimeFilter startTime;

    private ZonedDateTimeFilter endTime;

    private ReservationStatusFilter status;

    private LongFilter userId;

    private LongFilter facilitiesId;

    private LongFilter equipmentReservationsId;

    private Boolean eagerFetch = false;

    public ReservationCriteria(){
    }

    public ReservationCriteria(ReservationCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.event = other.event == null ? null : other.event.copy();
        this.estimatedParticipants = other.estimatedParticipants == null ? null : other.estimatedParticipants.copy();
        this.startTime = other.startTime == null ? null : other.startTime.copy();
        this.endTime = other.endTime == null ? null : other.endTime.copy();
        this.status = other.status == null ? null : other.status.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.facilitiesId = other.facilitiesId == null ? null : other.facilitiesId.copy();
        this.equipmentReservationsId = other.equipmentReservationsId == null ? null : other.equipmentReservationsId.copy();
        this.eagerFetch = other.eagerFetch == null ? null : new Boolean(other.eagerFetch);
    }

    @Override
    public ReservationCriteria copy() {
        return new ReservationCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getEvent() {
        return event;
    }

    public void setEvent(StringFilter event) {
        this.event = event;
    }

    public IntegerFilter getEstimatedParticipants() {
        return estimatedParticipants;
    }

    public void setEstimatedParticipants(IntegerFilter estimatedParticipants) {
        this.estimatedParticipants = estimatedParticipants;
    }

    public ZonedDateTimeFilter getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTimeFilter startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTimeFilter getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTimeFilter endTime) {
        this.endTime = endTime;
    }

    public ReservationStatusFilter getStatus() {
        return status;
    }

    public void setStatus(ReservationStatusFilter status) {
        this.status = status;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getFacilitiesId() {
        return facilitiesId;
    }

    public void setFacilitiesId(LongFilter facilitiesId) {
        this.facilitiesId = facilitiesId;
    }

    public LongFilter getEquipmentReservationsId() {
        return equipmentReservationsId;
    }

    public void setEquipmentReservationsId(LongFilter equipmentReservationsId) {
        this.equipmentReservationsId = equipmentReservationsId;
    }

    public Boolean getEagerFetch() {
        return eagerFetch;
    }

    public void setEagerFetch(Boolean eagerFetch) {
        this.eagerFetch = eagerFetch;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ReservationCriteria that = (ReservationCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(event, that.event) &&
            Objects.equals(estimatedParticipants, that.estimatedParticipants) &&
            Objects.equals(startTime, that.startTime) &&
            Objects.equals(endTime, that.endTime) &&
            Objects.equals(status, that.status) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(facilitiesId, that.facilitiesId) &&
            Objects.equals(equipmentReservationsId, that.equipmentReservationsId) &&
            Objects.equals(eagerFetch, that.eagerFetch);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        event,
        estimatedParticipants,
        startTime,
        endTime,
        status,
        userId,
        facilitiesId,
        equipmentReservationsId,
        eagerFetch
        );
    }

    @Override
    public String toString() {
        return "ReservationCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (event != null ? "event=" + event + ", " : "") +
                (estimatedParticipants != null ? "estimatedParticipants=" + estimatedParticipants + ", " : "") +
                (startTime != null ? "startTime=" + startTime + ", " : "") +
                (endTime != null ? "endTime=" + endTime + ", " : "") +
                (status != null ? "status=" + status + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
                (facilitiesId != null ? "facilitiesId=" + facilitiesId + ", " : "") +
                (equipmentReservationsId != null ? "equipmentReservationsId=" + equipmentReservationsId + ", " : "") +
                (eagerFetch != null ? "eagerFetch=" + eagerFetch + ", " : "") +
            "}";
    }

}
