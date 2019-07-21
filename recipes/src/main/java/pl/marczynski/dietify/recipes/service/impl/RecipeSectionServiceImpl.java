package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeSectionService;
import pl.marczynski.dietify.recipes.domain.RecipeSection;
import pl.marczynski.dietify.recipes.repository.RecipeSectionRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeSectionSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.RecipeSectionDTO;
import pl.marczynski.dietify.recipes.service.mapper.RecipeSectionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link RecipeSection}.
 */
@Service
@Transactional
public class RecipeSectionServiceImpl implements RecipeSectionService {

    private final Logger log = LoggerFactory.getLogger(RecipeSectionServiceImpl.class);

    private final RecipeSectionRepository recipeSectionRepository;

    private final RecipeSectionMapper recipeSectionMapper;

    private final RecipeSectionSearchRepository recipeSectionSearchRepository;

    public RecipeSectionServiceImpl(RecipeSectionRepository recipeSectionRepository, RecipeSectionMapper recipeSectionMapper, RecipeSectionSearchRepository recipeSectionSearchRepository) {
        this.recipeSectionRepository = recipeSectionRepository;
        this.recipeSectionMapper = recipeSectionMapper;
        this.recipeSectionSearchRepository = recipeSectionSearchRepository;
    }

    /**
     * Save a recipeSection.
     *
     * @param recipeSectionDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RecipeSectionDTO save(RecipeSectionDTO recipeSectionDTO) {
        log.debug("Request to save RecipeSection : {}", recipeSectionDTO);
        RecipeSection recipeSection = recipeSectionMapper.toEntity(recipeSectionDTO);
        recipeSection = recipeSectionRepository.save(recipeSection);
        RecipeSectionDTO result = recipeSectionMapper.toDto(recipeSection);
        recipeSectionSearchRepository.save(recipeSection);
        return result;
    }

    /**
     * Get all the recipeSections.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeSectionDTO> findAll() {
        log.debug("Request to get all RecipeSections");
        return recipeSectionRepository.findAll().stream()
            .map(recipeSectionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one recipeSection by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecipeSectionDTO> findOne(Long id) {
        log.debug("Request to get RecipeSection : {}", id);
        return recipeSectionRepository.findById(id)
            .map(recipeSectionMapper::toDto);
    }

    /**
     * Delete the recipeSection by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RecipeSection : {}", id);
        recipeSectionRepository.deleteById(id);
        recipeSectionSearchRepository.deleteById(id);
    }

    /**
     * Search for the recipeSection corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeSectionDTO> search(String query) {
        log.debug("Request to search RecipeSections for query {}", query);
        return StreamSupport
            .stream(recipeSectionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(recipeSectionMapper::toDto)
            .collect(Collectors.toList());
    }
}
