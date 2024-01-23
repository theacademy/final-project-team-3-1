package com.team3.shop.service;

import com.team3.shop.dto.BuyerInformationDto;
import com.team3.shop.model.BuyerInformation;
import com.team3.shop.repository.BuyerInformationRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public BuyerInformationDto getBuyerInformation(Long userId) {
        // Retrieve buyer information from the repository based on userId
        Optional<BuyerInformation> buyerInformationOptional = buyerInformationRepository.findByUserId(userId);

        if (buyerInformationOptional.isPresent()) {
            // Convert the entity to DTO
            BuyerInformation buyerInformation = buyerInformationOptional.get();
            return convertToDto(buyerInformation);
        } else {
            // Return null or handle as needed when buyer information is not found
            return null;
        }
    }

    // Helper method to convert entity to DTO
    private BuyerInformationDto convertToDto(BuyerInformation buyerInformation) {
        BuyerInformationDto buyerInformationDto = new BuyerInformationDto();
        buyerInformationDto.setUserId(buyerInformation.getUserId());
        buyerInformationDto.setName(buyerInformation.getName());
        buyerInformationDto.setAddress(buyerInformation.getAddress());
        buyerInformationDto.setCity(buyerInformation.getCity());
        buyerInformationDto.setState(buyerInformation.getState());
        buyerInformationDto.setZipcode(buyerInformation.getZipcode());
        buyerInformationDto.setEmail(buyerInformation.getEmail());


        return buyerInformationDto;
    }
}
