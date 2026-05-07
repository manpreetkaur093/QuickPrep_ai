package backend.controller;

import backend.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ai")
@CrossOrigin("https://quickprepp-ai.onrender.com, http://localhost:5173") 
public class AiController {

    @Autowired
    private AIService aiService;

    // 🔹 Generate 30 questions (15 Medium + 15 Advanced)
    @PostMapping("/generate")
    public ResponseEntity<?> generateQuestions(@RequestBody Map<String, String> body) {

        try {
            // 🔐 Input validation
            String skills = body.get("skills");
            String projects = body.get("projects");
            String experience = body.get("experience");
            String technologies = body.get("technologies");

            if (isEmpty(skills) || isEmpty(projects) || isEmpty(experience) || isEmpty(technologies)) {
                return ResponseEntity.badRequest().body("All fields are required");
            }

            // 🔥 Call service
            Map<String, List<String>> result =
                    aiService.generateQuestions(skills, projects, experience, technologies);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error generating questions: " + e.getMessage());
        }
    }

    // 🔹 Helper method
    private boolean isEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }
}