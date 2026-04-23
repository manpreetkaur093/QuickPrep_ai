package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import backend.model.Question;
import backend.repository.QuestionRepository;


@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    // Add Question
    @PostMapping
    public Question addQuestion(@RequestBody  Question question) {
        return questionRepository.save(question);
    }

    // Get All Questions
    @GetMapping
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
}