package com.team3.shop.service;

import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.UserDto;
import com.team3.shop.model.Cart;
import com.team3.shop.model.Seller;
import com.team3.shop.model.User;
import com.team3.shop.repository.CartRepository;
import com.team3.shop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Transactional
    public UserDto addUser(UserDto userDto) {
        System.out.println(userDto);
        User user = new User(userDto);
        System.out.println(user);

        // TODO: create new sellers on user creation. using a default seller of id = 1 for now.
        Seller defaultSeller = new Seller();
        defaultSeller.setId(1L);
        user.setSeller(defaultSeller);

        User savedUser = userRepository.saveAndFlush(user);
        UserDto responseUserDto = new UserDto(savedUser);
        //assign a cart to the new user

        Cart cart = new Cart();
        cart.setStatus("active");
        cart.setUser(savedUser);
        cartRepository.save(cart);

        responseUserDto.setPassword(null);
        return responseUserDto;
    }
}
