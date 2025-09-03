# Social Post Web Component

## Description

Create a `<social-post>` custom HTML element that visually simulates a social media post (like a tweet or Facebook post), using Vanilla JavaScript (Web Components) and Vanilla CSS. The component should be reusable, responsive, and accessible, and should not rely on any third-party libraries or frameworks.

![Social Post Examples](https://via.placeholder.com/800x300/f0f0f0/333333?text=Light+and+Dark+Theme+Examples)

## Technical Requirements

### 1. Content

The component must display the following elements:

- **Display Name** (e.g., Jane Doe)
- **Username / Handle** (e.g., @janedoe)
- **Timestamp** (e.g., 2h ago)
- **Avatar image**
- **Text content** (limit display to 3 rows maximum)
- **Like button with counter**

### 2. Custom Element

- Use the Web Components API
- Attach Shadow DOM to encapsulate styles
- Accept data via HTML attributes (e.g., username, avatar, content, etc.)
- Accept data via JavaScript properties

### 3. Styling

Use only vanilla CSS and encapsulate styling within the Shadow DOM.

#### Required Specifications:

- **Maximum width:** 400px
- **Font family:** Any Google Font
- **Text sizes:**
  - Body: 14px
  - Caption: 12px
  - Content: 16px
- **Line height:** 1.5
- **Font weights:** 400, 500
- **Spacing (gaps, padding):** 4px, 8px, 16px, 20px
- **Avatar size:** 40px

#### Theme Requirements:

**Light Theme (default):**

- Text colors: `#364358`, `#627288`
- Background: `#FFFFFF`
- Border: `#DEE4ED`

**Dark Theme:**

- Text colors: `#E8ECF3`, `#A4B1C4`
- Background: `#21242B`
- Border: `#A4B1C4`

### 4. Interactions

#### Like Button:

- Click to increment a counter
- Include a simple animation (e.g., heart pulse)
- No backend logic required — simple visual change is enough

## Bonus Features (Optional)

- **See more / See less** button for content exceeding 3 lines
- **Theme switcher** (switch button)
- **Support for `<slot>`** for injecting custom HTML content
- **Support dynamic updates** via JavaScript

## Usage Example

```html
<!-- Basic usage with attributes -->
<social-post
  username="janedoe"
  display-name="Jane Doe"
  avatar="https://example.com/avatar.jpg"
  timestamp="2h ago"
  content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
  likes="42"
  theme="light"
>
</social-post>

<!-- Programmatic usage -->
<script>
  const post = document.createElement("social-post");
  post.username = "johndoe";
  post.displayName = "John Doe";
  post.content = "Hello world!";
  post.likes = 15;
  document.body.appendChild(post);
</script>
```

## File Structure

```
├── README.md
├── index.html          # Demo page
├── src/
│   ├── social-post.js   # Main component
│   └── styles.css       # Component styles
└── tests/
    └── social-post.test.js
```

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone [your-repo-url]
   cd social-post-component
   ```

2. Open `index.html` in your browser to see the demo

3. Include the component in your project:
   ```html
   <script src="src/social-post.js"></script>
   ```

## API Reference

### Attributes

| Attribute      | Type   | Description                    | Default |
| -------------- | ------ | ------------------------------ | ------- |
| `username`     | String | User handle (e.g., @janedoe)   | -       |
| `display-name` | String | Full display name              | -       |
| `avatar`       | String | Avatar image URL               | -       |
| `timestamp`    | String | Post timestamp                 | -       |
| `content`      | String | Post text content              | -       |
| `likes`        | Number | Like count                     | 0       |
| `theme`        | String | Theme mode ('light' or 'dark') | 'light' |

### JavaScript Properties

All attributes are also available as JavaScript properties using camelCase:

- `username`
- `displayName`
- `avatar`
- `timestamp`
- `content`
- `likes`
- `theme`

### Methods

- `incrementLikes()` - Increments the like counter
- `setTheme(theme)` - Changes theme ('light' or 'dark')

## Browser Support

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Development

### Running Tests

```bash
# Open tests in browser
open tests/index.html

# Or run with a test runner of your choice
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Evaluation Criteria

This project will be evaluated based on:

- **Clarity of architecture and code**
- **Correctness and readability of code**
- **Proper use of Web Components API**
- **CSS encapsulation and theming**
- **Responsive design implementation**
- **Accessibility considerations**

## Timeline

**Deadline:** 2-5 business days from assignment receipt

## License

MIT License - feel free to use this component in your projects!
