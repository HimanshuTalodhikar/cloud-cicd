package com.taskapp.controller;

import com.taskapp.dto.ApiResponse;
import com.taskapp.entity.Task;
import com.taskapp.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // Allows calls from frontend
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Create a new task
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    // Get all tasks
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    // Update task status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id, @RequestParam String status) {
        Task updatedTask = taskService.updateTaskStatus(id, status);
        return ResponseEntity.ok(updatedTask);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(new ApiResponse("Task deleted successfully!", true));
    }
    
    // Get summary of tasks
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse> getTaskSummary() {
        long totalTasks = taskService.getAllTasks().size();
        long completedTasks = taskService.getTasksByStatus("COMPLETED").size();
        long pendingTasks = taskService.getTasksByStatus("PENDING").size();
        
        String summary = String.format("Total: %d, Pending: %d, Completed: %d", totalTasks, pendingTasks, completedTasks);
        return ResponseEntity.ok(new ApiResponse(summary, true));
    }
}
