package backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AIService {

    public Map<String, List<String>> generateQuestions(
            String skills, String projects, String experience, String technologies) {

        // 🔐 Safety for null/empty inputs
        skills = safe(skills, "your skills");
        projects = safe(projects, "your project");
        experience = safe(experience, "your experience");
        technologies = safe(technologies, "your technologies");

        List<String> medium = generateMediumQuestions(skills, projects, experience, technologies);
        List<String> advanced = generateAdvancedQuestions(skills, projects, experience, technologies);

        Map<String, List<String>> result = new HashMap<>();
        result.put("medium", medium);
        result.put("advanced", advanced);

        return result;
    }

    // 🔹 Medium Questions
    private List<String> generateMediumQuestions(String skills, String projects, String experience, String technologies) {

        List<String> templates = Arrays.asList(
                "Explain how you used %skills% in your project %projects%.",
                "What challenges did you face while working with %technologies%?",
                "Describe your role in the project %projects%.",
                "How did your experience (%experience%) help solve problems?",
                "How did you test your implementation in %projects%?",
                "What improvements would you make in %projects%?",
                "Explain a feature you built using %skills%.",
                "How did you debug issues in %technologies%?",
                "What tools did you use along with %technologies%?",
                "How did your project %projects% impact users?"
        );

        return generateQuestionsFast(templates, skills, projects, experience, technologies, 15);
    }

    // 🔹 Advanced Questions
    private List<String> generateAdvancedQuestions(String skills, String projects, String experience, String technologies) {

        List<String> templates = Arrays.asList(
                "Design a scalable system using %technologies%.",
                "How would you optimize performance in %projects%?",
                "Explain a complex bug you faced and how you fixed it.",
                "How would you redesign %projects% for scalability?",
                "Discuss trade-offs you considered using %technologies%.",
                "How would you handle high traffic in %projects%?",
                "How would you secure an application built with %technologies%?",
                "What architecture would you use for %projects% and why?",
                "How would you implement caching in %projects%?",
                "How would you monitor and log systems using %technologies%?"
        );

        return generateQuestionsFast(templates, skills, projects, experience, technologies, 15);
    }

    // 🚀 FAST GENERATOR (NO infinite loop, NO duplicates issue)
    private List<String> generateQuestionsFast(
            List<String> templates,
            String skills,
            String projects,
            String experience,
            String technologies,
            int count) {

        List<String> result = new ArrayList<>();
        List<String> shuffled = new ArrayList<>(templates);

        // Shuffle once (fast)
        Collections.shuffle(shuffled);

        for (int i = 0; i < count; i++) {

            // Rotate through templates (no limit issue)
            String template = shuffled.get(i % shuffled.size());

            String question = template
                    .replace("%skills%", skills)
                    .replace("%projects%", projects)
                    .replace("%experience%", experience)
                    .replace("%technologies%", technologies);

            result.add(question);
        }

        return result;
    }

    // 🔹 Helper method
    private String safe(String value, String fallback) {
        return (value == null || value.trim().isEmpty()) ? fallback : value;
    }
}