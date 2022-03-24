package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.Epilouge;
import com.doners.donersbackend.db.entity.EpilougeBudget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpilougeBudgetRepository extends JpaRepository<EpilougeBudget,String> {
    Optional<List<EpilougeBudget>> findAllByEpilouge(Epilouge epilouge);
}