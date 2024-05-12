# YBB's Boston Map

The map on the website primarily has two features:

- Project Markers
- Boston Overlays

# Both of these features depend on the populating of two seperate Google Spreadsheets:

- YBB Projects: Determines what projects populate the map
- Mapping Project Filters: Determines what overlays are avaliable to the user

# Detailed below is what you can and can't do to each spreadsheet without causing unexpected results:

- # YBB Projects

  - Cans
    - Add locations with an address, category, year, image, site name, and description
    - Omit a site name, year, image, and description
    - Give a custom category name (will show up on the map with a generic icon but the category name will be shown in the project's info window)
    - Enter a valid image url in the image column for an image to appear in the project's info window
    - Remove projects
    - Modify projects
  - **Cannots**
    - Add an extra column
    - Remove a column
    - Omit an address or category from a new project entry
    - Add an incomplete project
    - Remove top row
    - Rename sheet
  - Should nots (aesthetic purposes)
    - Projects with empty description columns
    - Projects with empty images columns
    - Projects without site name columns

- # Mapping Project Filters
  - Cans
    - Add sheets representing a new category of overlays
    - Add arbitrarily many overlays (columns)
    - Add arbitrarily many overlay categories (sheets)
    - Omit certain statistics for certain neighborhoods (region will appear grey)
    - Add images for certain neighborhoods in the Neighborhood Images Sheet
    - Omit images for certain neighborhoods in Neihhborhood Images Sheet (will default to images stored on site when user clicks on region)
  - **Cannots**
    - Add new neighborhood(s) (must add to neighborhoods.json (file mapping neighborhood names to neighborhood shapes))
    - Remove neighborhood(s)
    - Type neighborhood names any differently than they are currently typed on the existing sheets
    - Have any statistics that are not $ or % (code assumes the stats are one of the following)
    - Have any statistics that are not numbers (code assumes the statistics are numbers)
    - Have improperly formatted statistics in spreadsheet
    - Have statistics where the max is 0
    - Omit sources row (code expects format of "Source - ...")
    - Remove top row
    - Omit neighborhoods column

# Detailed below is how you can add projects/filters

- Adding a Project
  - Add another row to the "In Use" sheet of the YBB Past Projects spreadsheet as specifed above in the YBB Projects section
  - If you have entered a category other than one of the built in categories (Affordable Housing, Sustainable Food Systems, Community Partners) for the project's category, may want to add a custom icon for the project's marker.
  - To add a custom icon for a category add a row to the categories sheet with the category (exactly as typed in the In Use sheet) and a image address (this will be the project's marker)
    - **Note**: custom icons take precedence over existing category icons
- Adding a Filter Category
  - To add a filter category add another sheet to the Mapping Project Filters spreadsheet with the name of the filter category
  - Copy and paste the first column containing the neighborhood names, max, and "Neighborhood" cells to this sheet
  - Also, copy by sure to put your source in the cell following the max cell it should follow the format specified above
  - Adding a Filter to a Filter Category
    - Add a column with the first cell set as the filter name and the remaining column's cells set as the the statistic for the neighborhood in the corresponding row
    - **Note:** the final cell in the column should be the maximum value of the filter across the neighborhoods
  - If unclear reference previous sheets, ex. one filter category is Race and Ethnicity with the filters Percent White, Percent Black, etc. and source of "2010 Census Data"
- Adding images of neighborhoods
  - To set the image that pops up in the info window when one clicks on the neighborhood,
    paste an image address in the cell next to the corresponding neighborhood in the Neighborhood Images sheet
    found in the Mapping Project Filters Spreadsheet
  - By default if no image is provided, the website will refer to images on the web server
    **Note:** we **strongly** suggest these images are set. Some of the images on the web server
    are copyrighted.
