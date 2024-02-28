package com.example.WebSocket.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class WebSocketController {

    private final List<Task> tasks;

    public WebSocketController(){
        tasks = new ArrayList<>();
    }

    @MessageMapping("/add_new_tsk")
    @SendTo("tasks/added_task")
    public Task addTask(@RequestBody Task task){
        tasks.add(task);
        return task;
    }


}
