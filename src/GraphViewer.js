import React, { useEffect } from "react";


import { Flex, Spin } from 'antd';
import Graph from "graphology";
import {
    useRegisterEvents,
    useSigma, SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl
} from "@react-sigma/core";
import { parse } from "graphology-gexf/browser";

import "@react-sigma/core/lib/react-sigma.min.css";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import {
    AiOutlineZoomIn,
    AiOutlineZoomOut,
    AiOutlineFullscreenExit,
    AiOutlineFullscreen,
    AiFillPlayCircle,
    AiFillPauseCircle,
} from "react-icons/ai";
import { MdFilterCenterFocus } from "react-icons/md";

const sigmaStyle = { height: "90vh", width: "90vw" };
let fetchedTextGraph = null
// Component to load and configure the graph

const fetchGraphCashed = async () => {

    if (fetchedTextGraph) {
        return parse(Graph, fetchedTextGraph);;
    }

    const response = await fetch("/newv9.gexf"); // Correct path to the file
    const gexfText = await response.text();
    fetchedTextGraph = gexfText
    return parse(Graph, gexfText);


}

const SpinLoading = () => (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", display: "flex", justifyContent:"center", alignItems:"center" }}>
        <Flex align="center" gap="middle" >
            <Spin size="large" />
        </Flex>
    </div>
);



const GraphEvents = () => {
    const registerEvents = useRegisterEvents();
    const sigma = useSigma();
    const [draggedNode, setDraggedNode] = React.useState(null);

    useEffect(() => {
        // Register the events
        registerEvents({
            downNode: (e) => {
                setDraggedNode(e.node);
                sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
            },
            // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
            mousemovebody: (e) => {
                if (!draggedNode) return;
                // Get new position of node
                const pos = sigma.viewportToGraph(e);
                sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
                sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

                // Prevent sigma to move camera:
                e.preventSigmaDefault();
                e.original.preventDefault();
                e.original.stopPropagation();
            },
            // On mouse up, we reset the autoscale and the dragging mode
            mouseup: () => {
                if (draggedNode) {
                    setDraggedNode(null);
                    sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
                }
            },
            // Disable the autoscale at the first down interaction
            mousedown: () => {
                if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
            },
        });
    }, [registerEvents, sigma, draggedNode]);

    return null;
};


const loninColor = [5, 4, 2, 1]
function getNewGraph(graph, criteria_label) {
    if (!graph) {
        return null
    }
    graph?.forEachNode((node, attributes) => {
        const criteria = attributes[criteria_label] || 0;

        let color = "gray";
        if (criteria === 4) color = "#B71C1C";
        if (criteria === 3) color = "#FF6F00";
        if (criteria === 2) color = "#00C853";
        if (criteria === 1) color = "#0D47A1";
        if(criteria_label==="k_shell"){
            if (criteria === 4) color = "#B71C1C";
            if (criteria === 3) color = "#FF6F00";
            if (criteria === 2) color = "#00C853";
            if (criteria === 1) color = "#0D47A1";
            if ([1, 2, 3, 4].includes(criteria)) {
                graph.setNodeAttribute(node, "zIndex", 10);
    
            }
        }else if(criteria_label==="louvain"){
            if (criteria === 5) color = "#B71C1C";
            if (criteria === 4) color = "#FF6F00";
            if (criteria === 2) color = "#00C853";
            if (criteria === 1) color = "#0D47A1";
            if ([5, 4, 2, 1].includes(criteria)) {
                graph.setNodeAttribute(node, "zIndex", 10);
    
            }
        }else if(criteria_label==="infomap"){
            if (criteria === 4) color = "#B71C1C";
            if (criteria === 3) color = "#FF6F00";
            if (criteria === 2) color = "#00C853";
            if (criteria === 1) color = "#0D47A1";
            if ([4, 3, 2, 1].includes(criteria)) {
                graph.setNodeAttribute(node, "zIndex", 10);
    
            }
        }else if(criteria_label==="label_propagation"){
            if (criteria === 4) color = "#B71C1C";
            if (criteria === 3) color = "#FF6F00";
            if (criteria === 2) color = "#00C853";
            if (criteria === 1) color = "#0D47A1";
            if ([4, 3, 2, 1].includes(criteria)) {
                graph.setNodeAttribute(node, "zIndex", 10);
    
            }
        }else if(criteria_label==="spectral"){
            if (criteria === 3000) color = "#0D47A1";
            else if (criteria === 2000) color = "#00C853";
            else if (criteria === 1) color = "#FF6F00";
            else if (criteria === 1000) color = "#B71C1C";
            if ([0, 3, 2, 1].includes(criteria)) {
                graph.setNodeAttribute(node, "zIndex", 10);

            }
        }

        
        if ([1, 2, 3, 4].includes(criteria)) {
            graph.setNodeAttribute(node, "zIndex", 10);

        }
        graph.setNodeAttribute(node, "color", color);
        // const position = graph.getNodeAttribute(node, "x");
        // if (!position) {
        //     // Set random initial positions if not available
        //     graph.setNodeAttribute(node, "x", Math.random() * 1000);
        //     graph.setNodeAttribute(node, "y", Math.random() * 1000);
        // }

        if (attributes.followers > 750000) {
            graph.setNodeAttribute(node, "forceLabel", true);
        }
        graph.setNodeAttribute(node, "size", attributes.importance);

        // graph.setNodeAttribute(node, "size", Math.pow(Math.max(4, attributes.followers), 0.22));
        if (graph.degree(node) === 0) {
            graph.dropNode(node);
        }

    });
    return graph;
}


export const DisplayGraph = ({ criteria_label }) => {
    const [graph, setGraph] = React.useState(null);
    const [isCalculated, setIsCalculated] = React.useState(false)
    useEffect(() => {
        const fetchData = async () => {
            let gg = await fetchGraphCashed();
            setGraph(gg);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setIsCalculated(false)
        setTimeout(() => {
            let newGraph = getNewGraph(graph, criteria_label);
            if (newGraph) {
                setIsCalculated(true);
                setGraph(newGraph);
            }
            setIsCalculated(true)

        }, 1);

    }, [criteria_label]);
    return (
        isCalculated ? (
            <SigmaContainer graph={graph} style={sigmaStyle} settings={{ allowInvalidContainer: true, zIndex: true }}>
                <GraphEvents />
                <ControlsContainer position={"bottom-right"}>
                    <ZoomControl labels={{ zoomIn: "PLUS", zoomOut: "MINUS", reset: "RESET" }}>
                        <AiOutlineZoomIn />
                        <AiOutlineZoomOut />
                        <MdFilterCenterFocus />
                    </ZoomControl>
                    <FullScreenControl labels={{ enter: "ENTER", exit: "EXIT" }}>
                        <AiOutlineFullscreen />
                        <AiOutlineFullscreenExit />
                    </FullScreenControl>
                    <LayoutForceAtlas2Control
                        labels={{ stop: "STOP", start: "START" }}
                        settings={{ settings: { slowDown: 10, gravity: 1, edgeWeightInfluence: 1, barnesHutTheta: 2, barnesHutOptimize: true, adjustSizes: false,  scalingRatio:2 } }}
                        // settings={{
                        // settings: {
                        //     slowDown: 30,
                        //     gravity: 1,
                        //     edgeWeightInfluence: 1,
                        //     barnesHutTheta: 1.5,
                        //     barnesHutOptimize: true,
                        //     scalingRatio: 2,
                        // }
                        // }}
                    >
                        <AiFillPlayCircle />
                        <AiFillPauseCircle />
                    </LayoutForceAtlas2Control>
                </ControlsContainer>
            </SigmaContainer>
        ) : <SpinLoading />
    );

};
