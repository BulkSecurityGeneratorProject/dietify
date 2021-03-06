package pl.marczynski.dietify.recipes.domain;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A RecipeBasicNutritionData.
 */
@Entity
@Table(name = "recipe_basic_nutrition_data")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "recipebasicnutritiondata")
public class RecipeBasicNutritionData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Energy in kcal per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Energy in kcal per 100 gram of recipe meal calculated from products added to recipe", required = true)
    @Column(name = "energy", nullable = false)
    private Integer energy;

    /**
     * Protein in grams per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Protein in grams per 100 gram of recipe meal calculated from products added to recipe", required = true)
    @Column(name = "protein", nullable = false)
    private Integer protein;

    /**
     * Fat in grams per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Fat in grams per 100 gram of recipe meal calculated from products added to recipe", required = true)
    @Column(name = "fat", nullable = false)
    private Integer fat;

    /**
     * Carbohydrates in grams per 100 gram of recipe meal calculated from products added to recipe
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Carbohydrates in grams per 100 gram of recipe meal calculated from products added to recipe", required = true)
    @Column(name = "carbohydrates", nullable = false)
    private Integer carbohydrates;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getEnergy() {
        return energy;
    }

    public void setEnergy(Integer energy) {
        this.energy = energy;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Integer getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Integer carbohydrates) {
        this.carbohydrates = carbohydrates;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RecipeBasicNutritionData)) {
            return false;
        }
        return id != null && id.equals(((RecipeBasicNutritionData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RecipeBasicNutritionData{" +
            "id=" + getId() +
            ", energy=" + getEnergy() +
            ", protein=" + getProtein() +
            ", fat=" + getFat() +
            ", carbohydrates=" + getCarbohydrates() +
            "}";
    }
}
