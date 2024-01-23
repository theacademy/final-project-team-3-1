package com.team3.shop.repository;

import com.team3.shop.dto.BuyerInformationDto;
import com.team3.shop.model.BuyerInformation;
import com.team3.shop.model.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuyerInformationRepository extends JpaRepository<BuyerInformation, Long> {
}
