package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import backend.model.Attempt;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    long countByUserIdAndIsCorrect(Long userId, boolean isCorrect);

    @Query("SELECT a.userId, COUNT(a) as score FROM Attempt a WHERE a.isCorrect = true GROUP BY a.userId ORDER BY score DESC")
    List<Object[]> getLeaderboard();
}