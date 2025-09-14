@component
export class RacetrackMeshGenerator extends BaseScriptComponent {
    @input
    texture: Texture;

    @input
    renderTarget: RenderMeshVisual

    @input
    collisionTarget: ColliderComponent

    @input
    resolution: number

    @input
    minHeight: number;

    @input
    scalePlane: number;

    @input
    scaleHeight: number;

    private textureHeight: number;
    private textureWidth: number;
    private textureProvider: ProceduralTextureProvider;
    private textureSampleBlockWidth;
    private textureSampleBlockHeight;

    onAwake() {
        print("Awake")
        if (this.texture != null) {
            this.generateTerrainMesh()
        }
    }

    generateTerrainMesh() {
        if (!this.texture || !this.renderTarget) {
            print("ERROR: Please assign heightmap texture and mesh object");
            return;
        }
        this.textureHeight = this.texture.getHeight();
        this.textureWidth = this.texture.getWidth();
        this.textureSampleBlockHeight = Math.floor(this.textureHeight / this.resolution);
        this.textureSampleBlockWidth = Math.floor(this.textureWidth / this.resolution);
        
        // Get texture data
        this.textureProvider = ProceduralTextureProvider.createFromTexture(this.texture).control as ProceduralTextureProvider;
        
        // Create mesh builder
        var meshBuilder = new MeshBuilder([
            { name: "position", components: 3 },
            { name: "normal", components: 3 },
            { name: "color", components: 4 }
        ]);
        meshBuilder.topology = MeshTopology.Triangles;
        meshBuilder.indexType = MeshIndexType.UInt16;
        
        // Generate vertices
        var vertices = [];
        var normals = [];
        var colors = [];
        
        // Sample texture at regular intervals
        for (var z = 0; z < this.resolution; z++) {
            for (var x = 0; x < this.resolution; x++) {
                // Normalize coordinates to 0-1 range for texture sampling
                
                // Sample heightmap (assuming we can get pixel data)
                // Note: In Lens Studio, direct pixel access may be limited
                // This is a conceptual approach - actual implementation may vary
                var height = this.sampleHeightmap(z, x);
                
                // Convert to world coordinates
                var worldX = (x / (this.resolution - 1) - 0.5) * this.scalePlane;
                var worldZ = (z / (this.resolution - 1) - 0.5) * this.scalePlane;
                var worldY = height * this.scaleHeight;

                //print(`Vertex ${worldX} ${worldY} ${worldZ}`)
                
                
                vertices.push(worldX, worldY, worldZ);
                normals.push(0, 1, 0);
                
                // Generate color based on height
                var color = this.getColorFromHeight(height);
                colors.push(color.r, color.g, color.b, color.a);
                
                // Calculate normal (will be refined after all vertices are created)
            }
        }
        
        // Add vertices to mesh builder
        meshBuilder.appendVertices([
            vertices,
            normals,
            colors
        ]);
        
        // Generate indices for triangles
        this.generateIndices(meshBuilder);
        // print(`Total vertices: ${vertices.length / 3}`);
        // print(`Total colors: ${colors.length / 4}`);
        // print(`Expected vertices: ${this.resolution * this.resolution}`);

        // After generating indices
        // print(`Total indices: ${meshBuilder.getIndicesCount()}`);
        if (meshBuilder.isValid()) {
            // print("Mesh is valid")
            meshBuilder.updateMesh();
            var renderMesh = meshBuilder.getMesh();
            this.renderTarget.mesh = renderMesh;
            let shape = Shape.createMeshShape()
            shape.mesh = renderMesh;
            this.collisionTarget.shape = shape;
            print("Terrain mesh regenerated successfully!");
        } else {
            print("Mesh was invalid")
        }
        
    }

    sampleHeightmap(u, v): number {
        let data = new Uint8Array(this.textureSampleBlockHeight * this.textureSampleBlockWidth * 4);
        // print(`Region ${u * this.textureSampleBlockWidth} ${(this.resolution - v) * this.textureSampleBlockHeight}`)
        this.textureProvider.getPixels(
            u * this.textureSampleBlockWidth,
            (this.resolution - v - 1) * this.textureSampleBlockHeight,
            this.textureSampleBlockWidth,
            this.textureSampleBlockHeight,
            data
        )
        var sum = 0;
        for (let i = 0; i < data.length; i += 4) {
            sum += (data[i] + data[i+1] + data[i+2])// Sum RGB
        }
        const avg = sum / data.length / 3 / 255;
        return avg
    }

    getColorFromHeight(height) {
        // Interpolate between brown (low) and green (high)
        var brown = new vec4(0.6, 0.4, 0.2, 1.0);  // Brown color
        var green = new vec4(0.2, 0.8, 0.3, 1.0);  // Green color
        
        // Linear interpolation
        var r = brown.r + (green.r - brown.r) * height;
        var g = brown.g + (green.g - brown.g) * height;
        var b = brown.b + (green.b - brown.b) * height;
        
        return new vec4(r, g, b, 1.0);
    }

    generateIndices(meshBuilder) {
        // Generate triangle indices for the mesh
        // Mesh indices are vertical, then horizontal to vertical
        for (var z = 0; z < this.resolution - 1; z++) {
            for (var x = 0; x < this.resolution - 1; x++) {
                var topLeft = z * this.resolution + x;
                var topRight = (z + 1) * this.resolution + x;
                var bottomLeft = topLeft + 1;
                var bottomRight = topRight + 1;
                this.addQuadIndices(meshBuilder, topLeft, bottomLeft, bottomRight, topRight)
                // print(`${topLeft} ${topRight} ${bottomLeft} ${bottomRight}`)
            }
        }
    }
    addQuadIndices(meshBuilder, topLeft, bottomLeft, bottomRight, topRight){
        meshBuilder.appendIndices([
            topLeft, bottomRight, bottomLeft, // First Triangle
            bottomRight, topLeft, topRight // Second Triangle
        ]);
        
    }
}
