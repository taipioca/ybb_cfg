# YBB's Boston Map

The map on the website primarily has two features:

- Project Markers
- Boston Overlays

# Both of these features depend on the populating of two seperate Google Spreadsheets:

- YBB Projects: Determines what projects populate the map
- Mapping Project Filters: Determines what overlays are avaliable to the user

# Detailed below is what you can and can't do to each spreadsheet without causing unexpected results:

- # YBB Projects
  - # Cans
    - Add locations with an address, category, year, image, site name, and description
    - Omit a site name, year, image, and description
    - Give a custom category name (will show up on the map with a generic icon but the category name will be shown in the project's info window)
    - Enter a valid image url in the image column for an image to appear in the project's info window
    - Remove projects
    - Modify projects
  - # Cannots
    - Add an extra column
    - Remove a column
    - Omit an address or category from a new project entry
    - Add an incomplete project
    - Remove top row
    - Rename sheet
  - # Should nots (aesthetic purposes)
    - Projects with empty description columns
    - Projects with empty images columns
    - Projects without site name columns
- # Mapping Project Filters
  - # Cans
    - Add sheets representing a new category of overlays
    - Add arbitrarily many overlays (columns)
    - Add arbitrarily many overlay categories (sheets)
    - Omit certain statistics for certain neighborhoods (region will appear grey)
    - Add images for certain neighborhoods in the Neighborhood Images Sheet
    - Omit images for certain neighborhoods in Neihhborhood Images Sheet (will default to images stored on site when user clicks on region)
  - # Cannots
    - Add new neighborhood(s) (must add to neighborhoods.json (file mapping neighborhood names to neighborhood shapes))
    - Remove neighborhood(s)
    - Have any statistics that are not $ or % (code assumes the stats are one of the following)
    - Have any statistics that are not numbers (code assumes the statistics are numbers)
    - Have improperly formatted statistics in spreadsheet
    - Have statistics where the max is 0
    - Omit sources row (code expects format of "Source - ...")
    - Remove top row
    - Omit neighborhoods column

# Detailed below is how you can add projects/filters

- # Adding a Project
- # Adding a Filter Category
  - # Adding a Filter
