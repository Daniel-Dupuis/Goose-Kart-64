import { RacetrackType } from "./RacetrackType";

@component
export class RacetrackAPIHandler extends BaseScriptComponent {
    @input internetModule: InternetModule;

    private remoteServiceModule: RemoteServiceModule = require('LensStudio:RemoteServiceModule');
    private remoteMediaModule: RemoteMediaModule = require('LensStudio:RemoteMediaModule');

    private readonly API_BASE_URL: string = "https://racing-nefz.onrender.com";
    private readonly IMAGE_BASE_URL: string = `${this.API_BASE_URL}/saved_images/`;

    // ---------------- GET ----------------
    async getRacetracks(): Promise<RacetrackType[] | null> {
        if (!this.internetModule) {
            print("InternetModule is missing.");
            return null;
        }

        try {
            const response = await this.internetModule.fetch(`${this.API_BASE_URL}/api/racetracks`);
            if (response.status === 200) {
                const text = await response.text();
                print("Raw GET response:\n" + text);

                try {
                    const parsed = JSON.parse(text);
                    print("Parsed JSON:\n" + JSON.stringify(parsed, null, 2));
                    let ret: RacetrackType[] = []
                    for (let i = 0; i < parsed.racetracks.length; i++) {
                        let x = parsed.racetracks[i];
                        await this.fetchImageTextureById(x.id).then((tex) => {
                            ret.push({id: x.id, name: x.name, img: tex, creator: x.username, startpos: JSON.parse(x.start_pos)})
                        }).catch((e) => {
                            print("Uncaught error: " + e)
                        })
                    }
                    return ret;
                } catch {
                    print("GET response is not valid JSON.");
                    return null;
                }
            } else {
                print("GET HTTP error: " + response.status);
                return null;
            }
        } catch (err) {
            print("GET request failed: " + err);
            return null;
        }
    }

    // ---------------- POST ----------------
    async submitRacetrackTime(racetrackId: string, username: string, time: number | string): Promise<any | null> {
        if (!this.internetModule) {
            print("InternetModule is missing.");
            return null;
        }

        const url = `${this.API_BASE_URL}/api/racetracks/${racetrackId}/times`;

        try {
            const request = new Request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, time: parseFloat(time as string) })
            });

            const response = await this.internetModule.fetch(request);
            const text = await response.text();
            print("POST raw response:\n" + text);

            try {
                const parsed = JSON.parse(text);
                print("POST parsed JSON:\n" + JSON.stringify(parsed, null, 2));
                return parsed;
            } catch {
                print("POST response is not JSON.");
                return null;
            }

        } catch (err) {
            print("POST request failed: " + err);
            return null;
        }
    }

    // ---------------- IMAGE ----------------
    fetchImageTextureById(id: string): Promise<Texture | null> {
        return new Promise((resolve) => {
            if (!this.remoteServiceModule || !this.remoteMediaModule) {
                print("RemoteServiceModule or RemoteMediaModule missing.");
                resolve(null);
                return;
            }

            const imageUrl = `${this.IMAGE_BASE_URL}${id}.png`;
            print("Fetching image: " + imageUrl);

            const resource: DynamicResource = this.remoteServiceModule.makeResourceFromUrl(imageUrl);
            if (!resource) {
                print("Failed to create resource from URL.");
                resolve(null);
                return;
            }

            this.remoteMediaModule.loadResourceAsImageTexture(
                resource,
                (texture) => {
                    if (texture) {
                        print("Image loaded successfully!");
                        resolve(texture);
                    } else {
                        print("Texture is null.");
                        resolve(null);
                    }
                },
                (error) => {
                    print("Error loading texture: " + error);
                    resolve(null);
                }
            );
        });
    }
}

