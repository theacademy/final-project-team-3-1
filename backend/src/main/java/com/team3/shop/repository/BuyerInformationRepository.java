package com.team3.shop.repository;

import com.team3.shop.dto.BuyerInformationDto;
import com.team3.shop.model.BuyerInformation;
import com.team3.shop.model.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BuyerInformationRepository extends JpaRepository<BuyerInformation, Long> {
    Optional<BuyerInformation> findByUserId(Long userId);
}
