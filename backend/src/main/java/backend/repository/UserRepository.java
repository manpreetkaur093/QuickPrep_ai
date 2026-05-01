package backend.repository;

import java.lang.foreign.Linker.Option;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>  findByEmail(String email);
}