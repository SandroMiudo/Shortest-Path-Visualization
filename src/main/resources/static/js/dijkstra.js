class GraphNode{
    j;
    i;

    constructor(i,j) {
        this.i = i;
        this.j = j;
    }

    method_getSrc(){
        return this.i;
    }
    method_getTgt(){
        return this.j;
    }
}

class GridNode{
    id;

    constructor(id) {
        this.id = id;
    }

    method_getID(){
        return this.id;
    }
}

class Graph {
    nodes = [];

    method_create() {
        let n;
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 50; j++) {
                n = [];
                if (i - 1 >= 0) {
                    n.push(new GraphNode(i * 50 + j, i * 50 + j - 50));
                }
                if (i + 1 < 50) {
                    n.push(new GraphNode(i * 50 + j, i * 50 + j + 50));
                }
                if (j - 1 >= 0) {
                    n.push(new GraphNode(i * 50 + j, i * 50 + j - 1));
                }
                if (j + 1 < 50) {
                    n.push(new GraphNode(i * 50 + j, i * 50 + j + 1));
                }
                this.nodes.push(n);
            }
        }
    }

    method_shortest_Path(start, end) {
        let distance = [];
        let pred = [];

        for (let k = 0; k < 1250; k++) {
            distance.push(Number.MAX_SAFE_INTEGER);
        }
        for (let k = 0; k < 1250; k++) {
            pred.push(Number.MAX_SAFE_INTEGER);
        }

        distance[start] = 0;
        pred[start] = 0;

        let minHeap = new MinHeap();
        minHeap.method_makeHeap(distance);
        let counter = 0;
        while (!minHeap.method_isEmpty()) {
            let id = minHeap.extract_min();
            let n = this.nodes[id];
            if(distance[id] == Number.MAX_SAFE_INTEGER){
                return;
            }
            for (let i = 0; i < n.length; i++) {
                if(dragPoints.find((currentValue)=>{
                    return currentValue == n[i].method_getTgt();})){
                    continue;
                }
                if (distance[n[i].method_getSrc()] + 1 < distance[n[i].method_getTgt()]) {
                    distance[n[i].method_getTgt()] = distance[n[i].method_getSrc()] + 1;
                    pred[n[i].method_getTgt()] = n[i].method_getSrc();
                    minHeap.method_increase_key(n[i].method_getTgt(), distance[n[i].method_getTgt()]);
                }
                if(n[i].method_getTgt() == end){
                    let ids = [];
                    let i = pred[end];
                    ids.push(end);
                    while(i != start){
                        ids.push(i);
                        i = pred[i];
                    }
                    ids.push(start);
                    ids = ids.reverse();
                    setTimeout(function (){
                        let c = 0;
                        for(let x of ids) {
                            setTimeout(function () {
                                document.getElementById(x).innerHTML = '<span class="inner-cell-points"></span>'
                            },20 * c++);
                        }

                    },counter);
                    return;
                }
                setTimeout(function () {
                    document.getElementById(''+n[i].method_getTgt()).innerHTML = '<span class="inner-cell"></span>'
                },counter++);
            }
        }
    }
}

class MinHeap{
    keys = [];
    n = 0;

    method_makeHeap(distance){
        for(let i = 0; i < distance.length; i++){
            this.keys.push(new MinNode(i,distance[i]));
            this.n += 1;
        }

        for(let i = Math.floor(this.n / 2) - 1; i >= 0; i--){
            this.method_heapify_down(i);
        }
    }

    method_left(i){
        return 2 * i + 1;
    }

    method_right(i){
        return 2 * i + 2;
    }

    method_parent(i){
        return Math.floor((i-1)/2);
    }

    size(){
        return this.n;
    }

    method_getE_of(index){
        return this.keys[index].e;
    }

    method_heapify_up(i){
        while(i !== 0 && (this.keys[i].e < this.keys[this.method_parent(i)].e)){
            this.method_swap(i,this.method_parent(i));
            i = this.method_parent(i);
        }
    }
    method_heapify_down(i){
        let j;
        while(this.method_left(i) < this.n){
            j = this.method_left(i);
            if(this.method_right(i) < this.n && this.keys[this.method_right(i)].e < this.keys[j].e){
                j = this.method_right(i);
            }
            if(this.keys[j].e > this.keys[i].e){
                break;
            }
            this.method_swap(i,j);
            i = j;
        }
    }
    method_swap(i,j){
        let key = this.keys[i];
        this.keys[i] = this.keys[j];
        this.keys[j] = key;
    }
    method_increase_key(key , x){
        let j = 0;
        for(let i = 0; i < this.keys.length; i++){
            if(this.keys[i].id === key){
                j = i;
                this.keys[i].e = x;
            }
        }
        this.method_heapify_up(j);
    }
    extract_min(){
        let i = this.keys[0].id;
        this.n -= 1;
        this.method_swap(0,this.n);
        this.method_heapify_down(0);
        return i;
    }

    method_isEmpty(){
        return this.n === 0;
    }
}

class MinNode{
    id;
    e;
    constructor(id,e) {
        this.e = e;
        this.id = id;
    }

    method_getID(){
        return this.id;
    }
    method_getGewicht(){
        return this.e;
    }
}

let trigger = "green";
let array = [];
function f(i){
    let element = document.getElementById(i.id);
    if(element.style.backgroundColor === 'green'){
        return;
    }
    if(trigger === 'green'){
        element.style.backgroundColor = 'lightgreen';
        trigger = "red";
        array.push(i.id);
    }
    else if(trigger === "red"){
        element.style.backgroundColor = 'lightblue';
        trigger = "";
        array.push(i.id);
    }
}
function reset(){
    for(let j = 0; j < 1250; j++){
        document.getElementById(j).innerHTML = '';
        document.getElementById(j).style.backgroundColor = 'white';
    }
    array = [];
    trigger = 'green';
}
function getArray(){
    document.getElementById("hidden-field").value = array;
}

function solve(){
    if(array.length !== 2){
        return;
    }
    let graph = new Graph();
    graph.method_create();
    graph.method_shortest_Path(array[0],array[1]);
    dragPoints = [];
}

let dragPoints = [];

addEventListener('dragenter',(event)=>{
    if(event.target.style.backgroundColor === 'lightgreen' || event.target.style.backgroundColor === 'lightblue'){
        return;
    }
    event.target.innerHTML = '<span class="inner-block-point"></span>'
    dragPoints.push(event.target.id);
})




































