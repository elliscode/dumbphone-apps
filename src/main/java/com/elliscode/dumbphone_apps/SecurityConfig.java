package com.elliscode.dumbphone_apps;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@Profile("!https")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		//@formatter:off
        auth.inMemoryAuthentication() // password hashes generated with BCryptPasswordEncoder()
                .withUser("afrehner").password("$2a$10$uQUH8uicr4pG.3d8XoCtC.zbg.YsEzpw2iHF1d0Omm/ViHfrjweou").roles("USER")
                .and()
                .withUser("dad").password("$2a$10$S.2yue3cRNS02c0oGKMA7OmpM9B9uaU3LVsiPhpNcYWGzrRLnUhxm").roles("USER");
        //@formatter:on
	}

	@Override
	protected void configure(final HttpSecurity http) throws Exception {
		//@formatter:off
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/").hasRole("USER")
                .antMatchers("/login*").permitAll()
                .antMatchers("/img*").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/login/handle")
                .defaultSuccessUrl("/", true)
                .failureUrl("/login?error=true")
                .and()
                .rememberMe()
                .key(getKey()).tokenValiditySeconds(366 * 24 * 60* 60);
        //@formatter:on
	}

	private static String getKey() {
		Path path = Paths.get(System.getProperty("user.home")).resolve("dumbphone-apps").resolve("remember.key");
		String output = UUID.randomUUID().toString();
		synchronized (FileOperations.lock) {
			if (!Files.exists(path)) {
				try {
					Files.createDirectories(path.getParent());
				} catch (IOException e) {
					e.printStackTrace();
				}
				try (BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {
					writer.write(output);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
				output = reader.readLine();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return output;
		}
	}
}