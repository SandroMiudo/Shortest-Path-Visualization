package de.student.djkstra.components;

public class MinHeap {

    static class MinNode{
        private final int id;
        private int e;

        public MinNode(int id, int e) {
            this.id = id;
            this.e = e;
        }

    }

    private final MinNode[] keys;
    private Integer n = 0;

    public MinHeap(int size) {
        this.keys = new MinNode[size];
    }

    public void makeHeap(int[] distance) {
        for(int i = 0; i < distance.length; i++){
            keys[i] = new MinNode(i,distance[i]);
            n += 1;
        }

        for(int i = (n / 2) - 1; i >= 0; i--){
            heapify_down(i);
        }
    }

    private int left(int i){
        return 2 * i + 1;
    }

    private int right(int i){
        return 2 * i + 2;
    }

    private int parent(int i){
        return (i-1) / 2;
    }

    private int size(){
        return n;
    }

    private void heapify_up(int i){
        while(i != 0 && keys[i].e < keys[parent(i)].e){
            swap(i,parent(i));
            i = parent(i);
        }
    }

    private void heapify_down(int i){
        int j;
        while(left(i) < n){
            j = left(i);
            if(right(i) < n && keys[right(i)].e < keys[j].e){
                j = right(i);
            }
            if(keys[j].e > keys[i].e){
                break;
            }
            swap(i,j);
            i = j;
        }
    }

    private void swap(int i,int j){
        MinNode key = keys[i];
        keys[i] = keys[j];
        keys[j] = key;
    }

    public void increase_key(int key , int x){
        int j = 0;
        for(int i = 0; i < keys.length; i++){
            if(keys[i].id == key){
                j = i;
                keys[i].e = x;
            }
        }
        heapify_up(j);
    }

    public int extract_min(){
        int i = keys[0].id;
        n -= 1;
        swap(0,n);
        heapify_down(0);
        return i;
    }

    public boolean isEmpty(){
        return n == 0;
    }
}
