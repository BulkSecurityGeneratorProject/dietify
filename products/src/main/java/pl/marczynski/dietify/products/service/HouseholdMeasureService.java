package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.domain.HouseholdMeasure;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link HouseholdMeasure}.
 */
public interface HouseholdMeasureService {

    /**
     * Save a householdMeasure.
     *
     * @param householdMeasure the entity to save.
     * @return the persisted entity.
     */
    HouseholdMeasure save(HouseholdMeasure householdMeasure);

    /**
     * Get all the householdMeasures.
     *
     * @return the list of entities.
     */
    List<HouseholdMeasure> findAll();


    /**
     * Get the "id" householdMeasure.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HouseholdMeasure> findOne(Long id);

    /**
     * Delete the "id" householdMeasure.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the householdMeasure corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<HouseholdMeasure> search(String query);
}