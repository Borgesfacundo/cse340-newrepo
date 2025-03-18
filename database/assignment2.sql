-- Adding Tony stark to Account Table
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- modifying Tony Stark record from Account Table
UPDATE public.account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';
-- Deleting Tony Stark from de Account Table
DELETE FROM public.account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Modify GM Gummer Description from Inventory Table
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'the small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- Use Inner Join to connect inventory Table with Classification table
SELECT inv_make,
    inv_model,
    c.classification_name
FROM public.inventory AS i
    INNER JOIN public.classification AS c ON c.classification_id = i.classification_id
WHERE i.classification_id = 2;
-- Add '/vehicles' to the middle of file path of images in Inventory Table
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, 'images/', 'images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, 'images/', 'images/vehicles/');