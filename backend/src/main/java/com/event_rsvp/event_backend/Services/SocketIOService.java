package com.event_rsvp.event_backend.Services;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.event_rsvp.event_backend.DTO.GuestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Service
public class SocketIOService {

    @Autowired
    private SocketIOServer socketIOServer;

    @PostConstruct
    public void start() {
        socketIOServer.start();
        socketIOServer.addConnectListener(onConnected());
        socketIOServer.addDisconnectListener(onDisconnected());
        socketIOServer.addEventListener("updateRsvp", GuestDTO.class, (client, data, ackSender) -> {
            // Broadcast the updated guest details to all clients
            socketIOServer.getBroadcastOperations().sendEvent("rsvpUpdates", data);
        });
    }

    @PreDestroy
    public void stop() {
        socketIOServer.stop();
    }

    private ConnectListener onConnected() {
        return client -> System.out.println("Client connected: " + client.getSessionId());
    }

    private DisconnectListener onDisconnected() {
        return client -> System.out.println("Client disconnected: " + client.getSessionId());
    }
}