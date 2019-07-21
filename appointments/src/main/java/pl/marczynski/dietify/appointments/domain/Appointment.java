package pl.marczynski.dietify.appointments.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import pl.marczynski.dietify.appointments.domain.enumeration.AppointmentState;

/**
 * A Appointment.
 */
@Entity
@Table(name = "appointment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Date and time of the appointment
     */
    @NotNull
    @Column(name = "appointment_date", nullable = false)
    private Instant appointmentDate;

    /**
     * Current appointment state
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_state", nullable = false)
    private AppointmentState appointmentState;

    /**
     * Meal plan designed for patient. Id of MealPlan entity retrieved from mealplans service
     */
    @Column(name = "meal_plan_id")
    private Long mealPlanId;

    /**
     * General advice after appointment
     */
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "general_advice")
    private String generalAdvice;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("appointments")
    private PatientCard patientCard;

    @OneToOne(mappedBy = "appointment")
    @JsonIgnore
    private BodyMeasurement bodyMeasurement;

    @OneToOne(mappedBy = "appointment")
    @JsonIgnore
    private NutritionalInterview nutritionalInterview;

    @OneToMany(mappedBy = "appointment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AssignedMealPlan> mealPlans = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Instant appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public AppointmentState getAppointmentState() {
        return appointmentState;
    }

    public void setAppointmentState(AppointmentState appointmentState) {
        this.appointmentState = appointmentState;
    }

    public Long getMealPlanId() {
        return mealPlanId;
    }

    public void setMealPlanId(Long mealPlanId) {
        this.mealPlanId = mealPlanId;
    }

    public String getGeneralAdvice() {
        return generalAdvice;
    }

    public void setGeneralAdvice(String generalAdvice) {
        this.generalAdvice = generalAdvice;
    }

    public PatientCard getPatientCard() {
        return patientCard;
    }

    public void setPatientCard(PatientCard patientCard) {
        this.patientCard = patientCard;
    }

    public BodyMeasurement getBodyMeasurement() {
        return bodyMeasurement;
    }

    public void setBodyMeasurement(BodyMeasurement bodyMeasurement) {
        this.bodyMeasurement = bodyMeasurement;
    }

    public NutritionalInterview getNutritionalInterview() {
        return nutritionalInterview;
    }

    public void setNutritionalInterview(NutritionalInterview nutritionalInterview) {
        this.nutritionalInterview = nutritionalInterview;
    }

    public Set<AssignedMealPlan> getMealPlans() {
        return mealPlans;
    }

    public void setMealPlans(Set<AssignedMealPlan> assignedMealPlans) {
        this.mealPlans = assignedMealPlans;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Appointment)) {
            return false;
        }
        return id != null && id.equals(((Appointment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", appointmentDate='" + getAppointmentDate() + "'" +
            ", appointmentState='" + getAppointmentState() + "'" +
            ", mealPlanId=" + getMealPlanId() +
            ", generalAdvice='" + getGeneralAdvice() + "'" +
            "}";
    }
}
