import React from 'react'
import { ResponsiveNetwork, svgDefaultProps } from '@nivo/network'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/network/meta.yml'
import { groups } from '../../data/components/network/props'
import { generateNetworkData } from '@nivo/generators'

const initialProperties = Object.freeze({
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    linkDistance: 30,
    repulsivity: 6,
    iterations: 60,

    nodeColor: node => node.color,
    nodeBorderWidth: 1,
    nodeBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },

    linkColor: svgDefaultProps.linkColor,
    linkThickness: link => (2 - link.source.depth) * 2,

    isInteractive: true,

    animate: true,
    motionConfig: 'wobbly',
})

const generateData = () => generateNetworkData()

const Network = () => {
    return (
        <ComponentTemplate
            name="Network"
            meta={meta.Network}
            icon="network"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            generateData={generateData}
            getDataSize={data => data.nodes.length}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveNetwork
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] id: ${node.id}, index: ${node.index}`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Network