package de.student.djkstra.components;

import java.util.ArrayList;
import java.util.List;

public class Grid {

    private final List<Node> nodes = new ArrayList<>();

    public List<Node> create(){
        int ID_COUNTER = 0;
        for(int i = 0; i < 25; i++){
            for(int j = 0; j < 50; j++){
                nodes.add(new Node(ID_COUNTER++));
            }
        }
        return nodes;
    }
}
