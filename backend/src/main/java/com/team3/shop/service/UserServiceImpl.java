package com.team3.shop.service;

import com.team3.shop.dto.CartDto;
import com.team3.shop.dto.UserDto;
import com.team3.shop.model.User;
import com.team3.shop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserDto addUser(UserDto userDto) {
        System.out.println(userDto);
        User user = new User(userDto);
        System.out.println(user);
        User savedUser = userRepository.saveAndFlush(user);
        UserDto responseUserDto = new UserDto(savedUser);
        //assign a cart to the new user
        CartDto cartDto = new CartDto();
        cartDto.setUserId(responseUserDto.getId());
        responseUserDto.setPassword(null);
        return responseUserDto;
    }
}
