# MirrAR Assessment - [Netlify](https://mirrar-eyewear.netlify.app/)

## Eyewear Rendering Using Facial Landmark Points

## Installation

Install the dependencies for the project.

```bash
npm install
```

## Create Image Element
```javascript
        const eyewearElement = document.createElement("img");
        eyewearElement.id = "eyewear-image";
        eyewearElement.src = image-url;
        document.querySelector(".detectOnClick").appendChild(eyewearElement);

```

## Get keys points from the Face Mesh

* Left most eye coordinate
```javascript
        relativeShape(landmarksArray[33])
```
* Right Most eye coordinate
```javascript
        relativeShape(landmarksArray[263])
```

## Calculate key values

* X axis Center of the eyes
```javascript
        (eyeLeft.x + eyeRight.x) / 2
```
* Y axis Center of the eyes
```javascript
        (eyeLeft.y + eyeRight.y) / 2
```
* Total height of the eyewear
```javascript
        const calulateEyewearHeight = () => {
            const width = (landmarksArray[177].y - landmarksArray[139].y) * 868;
            return width;
        };
```
* Total width of the eyewear (using internet)
```javascript
        const calulateWidth = () => {
            return (
                Math.sqrt(
                    (landmarksArray[33].x - landmarksArray[263].x) ** 2 +
                    (landmarksArray[33].x - landmarksArray[263].x) ** 2
                ) * 868
            );
        };
```
* X coordinate of the eyewear
```javascript
        eyesCenterX - eyewearWidth / 2
```
* Y coordinate of the eyewear
```javascript
        eyesCenterY - eyewearHeight / 2
```

### Helper Functions

```javascript
        const relativeShape = (dimensions) => {
            const { x, y } = dimensions;
            return {
                x: x * 695,
                y: y * 868
            };
        };
```

## Assign the values
```javascript
        eyewearElement.style.left = eyewearX + "px";
        eyewearElement.style.top = eyewearY + "px";
        eyewearElement.style.width = eyewearWidth + "px";
        eyewearElement.style.height = eyewearHeight + "px";
```
