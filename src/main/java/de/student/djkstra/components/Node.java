package de.student.djkstra.components;

public class Node {

    private int id;
    private int src;
    private int tgt;

    public Node(int id){
        this.id = id;
    }

    public Node(int src, int tgt){
        this.src = src;
        this.tgt = tgt;
    }

    public int getId() {
        return id;
    }

    public int getSrc() {
        return src;
    }

    public int getTgt() {
        return tgt;
    }
}


