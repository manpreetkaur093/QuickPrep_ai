package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}