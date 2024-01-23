package com.team3.shop.service;

import com.team3.shop.dto.BuyerInformationDto;
import com.team3.shop.model.BuyerInformation;
import com.team3.shop.repository.BuyerInformationRepository;
import org.springframework.stereotype.Service;

@Service
public class BuyerInformationServiceImpl {

    private final BuyerInformationRepository buyerInformationRepository;

    public BuyerInformationServiceImpl(BuyerInformationRepository buyerInformationRepository) {
        this.buyerInformationRepository = buyerInformationRepository;
    }

    public void saveBuyerInformation(BuyerInformationDto buyerInformationDto) {
        BuyerInformation buyerInformation = new BuyerInformation();
        buyerInformation.setAddress(buyerInformationDto.getAddress());
        buyerInformation.setCity(buyerInformationDto.getCity());
        buyerInformation.setEmail(buyerInformationDto.getEmail());
        buyerInformation.setName(buyerInformationDto.getName());
        buyerInformation.setState(buyerInformationDto.getState());
        buyerInformation.setUserId(buyerInformationDto.getUserId());
        buyerInformation.setZipcode(buyerInformationDto.getZipcode());

        buyerInformationRepository.save(buyerInformation);
    }
}
