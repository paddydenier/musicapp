package com.paddy.musicapp.user;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/user/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    
    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = userService.addUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/{userId}/addInstrument/{instrumentId}")
    public ResponseEntity<User> addInstrumentToUser (
        @PathVariable Long userId,
        @PathVariable Long instrumentId
    ) {
        User updatedUser = userService.addInstrumentToUser(userId, instrumentId);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/{userId}/removeInstrument/{instrumentId}")
    public ResponseEntity<User> removeInstrumentfromUser (
        @PathVariable Long userId,
        @PathVariable Long instrumentId
    ) {
        User updatedUser = userService.removeInstrumentFromUser(userId, instrumentId);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/getUsers") 
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<UserResponse> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }
}
