# México 2030 - Airtable Configuration Guide

## Database Structure

### 1. Reports Table
**Table Name:** `Reports`

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| **ID** | Auto Number | Unique identifier | 1001 |
| **Title** | Single line text | Brief report title | "Bache en Av. Reforma" |
| **Description** | Long text | Detailed problem description | "Bache grande que causa daños..." |
| **Category** | Single select | Problem category | Infraestructura, Seguridad, Medio Ambiente, Transporte, Salud, Educación |
| **Status** | Single select | Current status | Urgente, Importante, Moderado, Bajo, Resuelto |
| **Location** | Single line text | Exact address | "Av. Reforma #456, CDMX" |
| **Coordinates** | Geolocation | GPS coordinates | 19.4326, -99.1332 |
| **Evidence** | Attachment | Photos/videos | [File attachments] |
| **Votes** | Number | Community votes | 45 |
| **Reporter** | Single line text | Citizen name | "María González" |
| **Email** | Email | Contact email | "maria@email.com" |
| **Phone** | Phone | Contact phone | "+52 1 55 1234 5678" |
| **Created** | Created time | Report timestamp | 2024-01-15 10:30:00 |
| **Updated** | Last modified time | Last update | 2024-01-15 14:45:00 |

### 2. Proposals Table
**Table Name:** `Proposals`

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| **ID** | Auto Number | Unique identifier | 2001 |
| **Title** | Single line text | Proposal title | "Instalación de ciclovías seguras" |
| **Description** | Long text | Detailed proposal | "Red de ciclovías protegidas..." |
| **Category** | Single select | Proposal category | Transporte, Medio Ambiente, Seguridad, etc. |
| **Status** | Single select | Current status | Activa, Aprobada, Rechazada, Implementada |
| **Author** | Single line text | Citizen name | "Carlos Ruiz" |
| **Email** | Email | Contact email | "carlos@email.com" |
| **Budget** | Currency | Estimated budget | $2,500,000 MXN |
| **Timeline** | Single line text | Implementation time | "6 meses" |
| **Votes** | Number | Community votes | 234 |
| **Location** | Single line text | Target area | "Zona Centro, CDMX" |
| **Created** | Created time | Proposal timestamp | 2024-01-10 09:15:00 |
| **Updated** | Last modified time | Last update | 2024-01-15 16:30:00 |

### 3. Categories Table (Reference)
**Table Name:** `Categories`

| Field Name | Type | Description |
|------------|------|-------------|
| **Name** | Single line text | Category name |
| **Icon** | Attachment | Category icon |
| **Color** | Single line text | Hex color code |
| **Description** | Long text | Category description |

## Airtable Views

### Reports Views
1. **All Reports** - Grid view with all fields
2. **By Status** - Grouped by status
3. **By Category** - Grouped by category
4. **Map View** - Geolocation view for map integration
5. **Recent** - Filtered by last 7 days
6. **High Priority** - Filtered for urgent/important status

### Proposals Views
1. **All Proposals** - Grid view with all fields
2. **Active Voting** - Filtered for active status
3. **Approved** - Filtered for approved status
4. **By Category** - Grouped by category
5. **Top Voted** - Sorted by votes descending
6. **Implemented** - Filtered for implemented status

## API Integration

### Base URL
```
https://api.airtable.com/v0/YOUR_BASE_ID/
```

### Endpoints
- **GET Reports:** `/Reports`
- **POST Report:** `/Reports`
- **GET Proposals:** `/Proposals`
- **POST Proposal:** `/Proposals`
- **PATCH Vote:** `/Reports/{id}` or `/Proposals/{id}`

### Authentication
Use Bearer token in Authorization header:
```
Authorization: Bearer YOUR_API_KEY
```

### Rate Limits
- 5 requests per second per base
- 100 requests per minute per base

## Webhook Configuration

### Webhook URL
Set up webhook endpoint in your application to receive real-time updates:
```
https://your-app.com/webhook/airtable
```

### Events to Monitor
- New report created
- Report status updated
- New proposal created
- Proposal votes updated
- Proposal status changed

### Webhook Payload Structure
```json
{
  "action": "create" | "update",
  "table": "Reports" | "Proposals",
  "record": { ... },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Glide Configuration

### 1. App Setup
- **App Name:** México 2030
- **App Icon:** Use provided logo
- **Primary Color:** #00FF9F (neon green)
- **Secondary Color:** #00E5FF (neon cyan)

### 2. Data Sources
- **Reports Table:** Connect to Airtable Reports table
- **Proposals Table:** Connect to Airtable Proposals table
- **Categories Table:** Connect to Airtable Categories table

### 3. Screens
- **Home Screen:** Landing page with hero section
- **Report Screen:** Form for new reports
- **Map Screen:** Interactive map with filters
- **Proposals Screen:** List of proposals with voting
- **Dashboard Screen:** Real-time metrics

### 4. Components
- **Map Component:** Use Glide's map component with Airtable geolocation
- **Form Component:** Use Glide's form component with validations
- **List Component:** Use Glide's list component for proposals
- **Chart Component:** Use Glide's chart component for metrics

### 5. Actions
- **Submit Report:** Create new record in Reports table
- **Vote Proposal:** Update votes field in Proposals table
- **Filter Map:** Apply filters to map view
- **Share Report:** Share report via social media

## Bubble Configuration

### 1. Database Setup
- Create data types: Report, Proposal, Category
- Set up fields matching Airtable structure
- Configure privacy rules for user data

### 2. Design Elements
- **Header:** Fixed navigation with logo
- **Hero:** Full-screen with animated background
- **Map:** Interactive map with markers
- **Forms:** Multi-step forms with validations
- **Cards:** Proposal cards with hover effects

### 3. Workflows
- **Create Report:** Workflow to add new report
- **Update Vote:** Workflow to increment vote count
- **Filter Data:** Workflow to apply filters
- **Send Notifications:** Email notifications for updates

### 4. Plugins
- **Google Maps:** For interactive map
- **File Upload:** For evidence attachments
- **Chart.js:** For metrics visualization
- **Air Date/Time Picker:** For date selection

## Security Considerations

### Data Privacy
- Implement user authentication
- Encrypt sensitive data
- Regular security audits
- GDPR compliance for EU users

### Rate Limiting
- Implement request throttling
- Use caching for frequently accessed data
- Monitor API usage

### Validation
- Server-side validation for all inputs
- File type restrictions for uploads
- Size limits for attachments
- Rate limiting for voting

## Testing Checklist

- [ ] Create test reports
- [ ] Test form validations
- [ ] Test map interactions
- [ ] Test voting system
- [ ] Test real-time updates
- [ ] Test mobile responsiveness
- [ ] Test accessibility features
- [ ] Test webhook functionality
- [ ] Test API rate limits
- [ ] Test data export/import
