package pl.marczynski.dietify.mealplans.domain;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

/**
 * A MealDefinition.
 */
@Entity
@Table(name = "meal_definition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mealdefinition")
public class MealDefinition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Daily ordinal number of meal
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Daily ordinal number of meal", required = true)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    /**
     * Id of MealType entity retrieved from recipes service
     */
    @NotNull
    @ApiModelProperty(value = "Id of MealType entity retrieved from recipes service", required = true)
    @Column(name = "meal_type_id", nullable = false)
    private Long mealTypeId;

    /**
     * Usual time of meal in 24h format: HH:mm
     */
    @NotNull
    @Pattern(regexp = "\\d{2}:\\d{2}")
    @ApiModelProperty(value = "Usual time of meal in 24h format: HH:mm", required = true)
    @Column(name = "time_of_meal", nullable = false)
    private String timeOfMeal;

    /**
     * Part of daily total energy expressed in percent. Sum of all values for one MealPlan must be equal 100.
     */
    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @ApiModelProperty(value = "Part of daily total energy expressed in percent. Sum of all values for one MealPlan must be equal 100.", required = true)
    @Column(name = "percent_of_energy", nullable = false)
    private Integer percentOfEnergy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public Long getMealTypeId() {
        return mealTypeId;
    }

    public void setMealTypeId(Long mealTypeId) {
        this.mealTypeId = mealTypeId;
    }

    public String getTimeOfMeal() {
        return timeOfMeal;
    }

    public void setTimeOfMeal(String timeOfMeal) {
        this.timeOfMeal = timeOfMeal;
    }

    public Integer getPercentOfEnergy() {
        return percentOfEnergy;
    }

    public void setPercentOfEnergy(Integer percentOfEnergy) {
        this.percentOfEnergy = percentOfEnergy;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MealDefinition)) {
            return false;
        }
        return id != null && id.equals(((MealDefinition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MealDefinition{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", mealTypeId=" + getMealTypeId() +
            ", timeOfMeal='" + getTimeOfMeal() + "'" +
            ", percentOfEnergy=" + getPercentOfEnergy() +
            "}";
    }
}
