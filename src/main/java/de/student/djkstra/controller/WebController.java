package de.student.djkstra.controller;

import de.student.djkstra.components.Graph;
import de.student.djkstra.components.Grid;
import de.student.djkstra.components.Node;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class WebController {

    private WebController(){
    }

    @GetMapping("/")
    public String start(Model m){
        Grid grid = new Grid();
        List<Node> nodes = grid.create();
        m.addAttribute("nodes",nodes);
        return "main";
    }

    @GetMapping("/shortest/way")
    public String shortest(int [] ids, Model model){
        if(ids.length != 2){
            return "redirect:/";
        }
        Graph graph = new Graph();
        graph.create();
        List<Integer> preds = graph.shortest_Path(ids[0], ids[1]);
        Grid grid = new Grid();
        List<Node> nodes = grid.create();
        model.addAttribute("nodes",nodes);
        model.addAttribute("preds",preds);
        return "algo";
    }
}
