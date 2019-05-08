package pl.marczynski.dietify.mealplans.repository;

import org.springframework.data.repository.query.Param;
import pl.marczynski.dietify.mealplans.domain.MealPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the MealPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    @Query("select mealPlan from MealPlan mealPlan " +
        "left join fetch mealPlan.mealDefinitions " +
        "left join fetch mealPlan.tagsGoodFors " +
        "left join fetch mealPlan.tagsBadFors " +
        "left join fetch mealPlan.days days " +
        "left join fetch days.meals meals " +
        "left join fetch meals.mealRecipes " +
        "left join fetch meals.mealProducts " +
        "where mealPlan.id =:id")
    Optional<MealPlan> findOneWithEagerRelationships(@Param("id") Long id);
}