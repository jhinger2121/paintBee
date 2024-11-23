# 🎨 PaintBee: A Creative Canvas Drawing Tool  https://incomparable-fudge-2339dc.netlify.app/

PaintBee is a feature-rich web-based drawing tool that enables users to express their creativity on a digital canvas. With dynamic brushes, shape-drawing tools, and customization options, it’s perfect for artists and hobbyists alike.  

## ✨ Features  

- **Dynamic Brush Tools**: Choose from a variety of brushes, including Pencil, Pen, and Marker.  
- **Shape Creation**: Draw circles, rectangles, and straight lines with ease.  
- **Undo & Redo**: Correct mistakes or revisit previous actions with a single click.  
- **Customizable Settings**: Adjust brush size, color, and opacity for a personalized experience.  
- **Responsive Design**: Optimized for different screen sizes to ensure seamless use on desktops and mobile devices.  
- **Clear Canvas**: Start fresh whenever you want by clearing the canvas with one click.  

## 🛠️ Technologies Used  

- **HTML5 Canvas API**: For drawing and rendering graphics.  
- **Vanilla JavaScript**: To manage drawing logic, event handling, and state management.  
- **CSS3**: For styling the interface and ensuring responsiveness.  

## 🚀 Getting Started  

### Prerequisites  
To run PaintBee locally, ensure you have the following:  
- A modern web browser (e.g., Chrome, Firefox, or Edge).  

### Installation  
1. Clone this repository:  
   ```bash  
   git clone https://github.com/your-username/PaintBee.git
2. Navigate to the project directory:  
   ```bash  
   cd PaintBee  
## 🖌️ How to Use  

1. **Select a Brush**:  
   - Click the **Pencil** button on the toolbar.  
   - Choose a brush type (e.g., Plain, Sketchy) from the dropdown menu.  

2. **Draw Shapes**:  
   - Click the **Shape** button.  
   - Select a shape type (Circle, Line, Rectangle) from the dropdown menu.  

3. **Customize Settings**:  
   - Adjust **Brush Size** using the size slider.  
   - Change the **Opacity** and **Color** of your brush or shapes from the settings panel.  

4. **Undo & Redo**:  
   - Use the **Undo** button to reverse your last action.  
   - Use the **Redo** button to restore an undone action.  

5. **Clear Canvas**:  
   - Click the **Clear** button to reset the canvas and start fresh.  

---

## 📂 Project Structure  

```plaintext
📦 PaintBee  
├── brushes/                    # Brush-related classes and logic  
│   ├── base_brush.js           # Base brush class  
│   ├── line_pen_brush.js       # Line pen brush  
│   ├── maker_brush.js          # Marker brush  
│   ├── pen_brush.js            # Pen brush  
│   └── pencil_brush.js         # Pencil brush  
├── settings/                   # Configuration and settings  
│   └── base_canvas_settings.js # Base canvas settings  
├── shapes/                     # Shape-related classes  
│   ├── circle.js               # Circle shape  
│   ├── line.js                 # Line shape  
│   └── rectangle.js            # Rectangle shape  
├── util/                       # Utility functions  
│   └── utils.js                # Helper utilities  
├── about.html                  # About page  
├── bee.png                     # Logo or icon image  
├── index.html                  # Main HTML file  
├── main.js                     # Core JavaScript logic  
└── style.css                   # Styling for the UI  

---

## 💬 Feedback  

We’d love to hear your thoughts! Whether you have ideas for improvement, found a bug, or simply want to share your experience, your feedback is always welcome.  

Here’s how you can contribute:  
1. **Open an Issue**: Report bugs or suggest new features by creating an issue in this repository.  
2. **Contact Me**: Reach out directly via [Your Preferred Contact Method].  
3. **Submit a Pull Request**: Contribute to the project by fixing issues or adding new features.  

Let’s collaborate and make PaintBee even better! 🚀  

