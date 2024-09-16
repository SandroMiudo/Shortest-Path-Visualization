package de.student.djkstra.components;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Graph {

    private final List<List<Node>> nodes = new ArrayList<>();

    public void create(){
        List<Node> n;
        for(int i = 0; i < 10; i++){
            for(int j = 0; j < 50; j++){
                n = new ArrayList<>();
                if(i - 1 >= 0){
                    n.add(new Node(i * 50 + j,i * 50 + j - 50));
                }
                if(i + 1 < 10){
                    n.add(new Node(i * 50 + j,i * 50 + j + 50));
                }
                if(j - 1 > 0){
                    n.add(new Node(i * 50 + j,i * 50 + j - 1));
                }
                if(j + 1 < 50){
                    n.add(new Node(i * 50 + j,i * 50 + j + 1));
                }
                nodes.add(n);
            }
        }
    }

    public List<Integer> shortest_Path(int start, int end){
        int [] distance = new int[nodes.size()];
        int [] pred = new int[nodes.size()];

        Arrays.fill(distance,Integer.MAX_VALUE);
        Arrays.fill(pred,Integer.MAX_VALUE);

        distance[start] = 0;
        pred[start] = 0;

        MinHeap minHeap = new MinHeap(distance.length);
        minHeap.makeHeap(distance);

        while(!minHeap.isEmpty()){
            int id = minHeap.extract_min();

            List<Node> n = this.nodes.get(id);

            for(Node node : n){
                if(distance[node.getSrc()] + 1 < distance[node.getTgt()]){
                    distance[node.getTgt()] = distance[node.getSrc()] + 1;
                    pred[node.getTgt()] = node.getSrc();
                    minHeap.increase_key(node.getTgt(),distance[node.getTgt()]);
                }
            }
        }
        List<Integer> ids = new ArrayList<>();
        int i = pred[end];
        while(i != start){
            ids.add(i);
            i = pred[i];
        }
        ids.add(end);
        ids.add(start);
        return ids;
    }
}
