package backend.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import backend.model.Attempt;
import backend.model.Question;
import backend.repository.AttemptRepository;
import backend.repository.QuestionRepository;

@RestController
@RequestMapping("/attempts")
public class AttemptController {

    @Autowired
    private AttemptRepository attemptRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping
    public Attempt submitAttempt(@RequestBody Attempt attempt) {

        // Fetch question from DB
        Question question = questionRepository.findById(attempt.getQuestionId()).orElse(null);

        if (question != null) {
            // Check answer
            boolean isCorrect = question.getCorrectAnswer()
                    .equalsIgnoreCase(attempt.getUserAnswer());

            attempt.setCorrect(isCorrect);
        }

        return attemptRepository.save(attempt);
    }

    @GetMapping("/score/{userId}")
    public long getScore(@PathVariable Long userId) {
        return attemptRepository.countByUserIdAndIsCorrect(userId, true);
    }

    @GetMapping("/leaderboard")
    public List<Map<String, Object>> getLeaderboard() {
        List<Object[]> results = attemptRepository.getLeaderboard();

        List<Map<String, Object>> leaderboard = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> data = new HashMap<>();
            data.put("userId", row[0]);
            data.put("score", row[1]);
            leaderboard.add(data);
        }

        return leaderboard;
    }

}