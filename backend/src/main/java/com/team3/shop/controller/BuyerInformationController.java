package com.team3.shop.controller;

import com.team3.shop.dto.BuyerInformationDto;
import com.team3.shop.service.BuyerInformationServiceImpl;
import com.team3.shop.service.CartServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyer-information")
public class BuyerInformationController {

    private final CartServiceImp cartServiceImp;
    private final BuyerInformationServiceImpl buyerInformationServiceImpl;

    public BuyerInformationController(CartServiceImp cartServiceImp, BuyerInformationServiceImpl buyerInformationServiceImpl) {
        this.cartServiceImp = cartServiceImp;
        this.buyerInformationServiceImpl = buyerInformationServiceImpl;
    }

        @PutMapping("/paypal/{cartId}")
        public ResponseEntity<String> paypal(@PathVariable Long cartId, @RequestBody BuyerInformationDto buyerInformationDto,  @RequestBody Long userId) {

            try {
                // Update cart status
                cartServiceImp.checkoutCart(cartId);

                // Save buyer information
                buyerInformationDto.setUserId(userId);
                buyerInformationServiceImpl.saveBuyerInformation(buyerInformationDto);

                // Perform PayPal integration or any other payment processing logic

                // Return success response
                return ResponseEntity.ok("Checkout successful!");
            } catch (Exception e) {
                // Log the exception for debugging purposes
                e.printStackTrace();
                // Handle other errors
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during checkout");
            }
        }
}
