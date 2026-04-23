package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import backend.util.JwtUtil;
import backend.dto.LoginResponse;
import backend.dto.UserResponse;
import backend.model.User;
import backend.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public UserResponse register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        UserResponse response = new UserResponse();
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {

        User existingUser = userRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equals(user.getEmail()))
                .findFirst()
                .orElse(null);

        if (existingUser != null &&
                passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {

            String token = JwtUtil.generateToken(
                    existingUser.getEmail(),
                    existingUser.getRole());

            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setEmail(existingUser.getEmail());
            response.setRole(existingUser.getRole());

            return response;
        }

        throw new RuntimeException("Invalid Credentials");
    }

    @GetMapping("/profile")
    public String getProfile(@RequestHeader("Authorization") String authHeader) {

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return JwtUtil.extractAllClaims(token).getSubject();
        }

        return "Token missing or invalid";
    }
}
