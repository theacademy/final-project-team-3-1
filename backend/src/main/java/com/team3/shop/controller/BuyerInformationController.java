package com.team3.shop.controller;

import com.team3.shop.dto.BuyerInformationDto;
import com.team3.shop.model.User;
import com.team3.shop.repository.UserRepository;
import com.team3.shop.service.BuyerInformationServiceImpl;
import com.team3.shop.service.CartServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyer-information")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600) // Adjust origins to match your frontend URL
public class BuyerInformationController {

    @Autowired
    private UserRepository userRepository;
    private final CartServiceImp cartServiceImp;
    private final BuyerInformationServiceImpl buyerInformationServiceImpl;

    public BuyerInformationController(CartServiceImp cartServiceImp, BuyerInformationServiceImpl buyerInformationServiceImpl) {
        this.cartServiceImp = cartServiceImp;
        this.buyerInformationServiceImpl = buyerInformationServiceImpl;
    }

    @PutMapping("/paypal/{cartId}/{userId}")
    public ResponseEntity<String> paypal(@PathVariable Long cartId, @RequestBody BuyerInformationDto buyerInformationDto, @RequestBody Long userId) {
        System.out.println("calledddddddddddd");
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

    @GetMapping("/{userId}")
    public ResponseEntity<BuyerInformationDto> getBuyerInformation(@PathVariable Long userId) {
        try {
            // Retrieve buyer information based on userId
            BuyerInformationDto buyerInformationDto = buyerInformationServiceImpl.getBuyerInformation(userId);

            // Return the buyer information in the response
            return ResponseEntity.ok(buyerInformationDto);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Handle other errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    public User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepository.findByEmail(username).orElseThrow();
        } else {
            throw new RuntimeException();
        }
    }
}
