-- Insert AUSD Token
INSERT INTO ausd_token (name, symbol, decimals, address, logo_uri) VALUES
('Akreage USD', 'AUSD', 18, '0x1234567890123456789012345678901234567890', 'https://via.placeholder.com/128/4f46e5/FFFFFF?text=AUSD');

-- Insert Users
INSERT INTO users (id, name, avatar, bio, followers, following) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Alex Johnson', 'https://randomuser.me/api/portraits/men/32.jpg', 'Real estate developer with 15+ years experience', 1240, 56),
('550e8400-e29b-41d4-a716-446655440002', 'Sophia Chen', 'https://randomuser.me/api/portraits/women/44.jpg', 'Crypto investor and real estate enthusiast', 3450, 124),
('550e8400-e29b-41d4-a716-446655440003', 'Marcus Williams', 'https://randomuser.me/api/portraits/men/75.jpg', 'Blockchain developer and property investor', 5670, 230),
('550e8400-e29b-41d4-a716-446655440004', 'Emma Davis', 'https://randomuser.me/api/portraits/women/19.jpg', 'Architectural designer and urban planner', 8900, 312);

-- Insert Projects (unified table for both project collections and individual investment opportunities)
INSERT INTO projects (id, name, description, image, images, developer_id, owner_id, location, property_type, price, min_investment, funding_goal, funding_raised, funding_deadline, expected_return, token_symbol, nft_contract_address, properties_count, progress, status, duration, start_date, likes, investor_count, approved) VALUES

-- Large project collections (what builders create)
('650e8400-e29b-41d4-a716-446655440001', 'Urban Renaissance', 'A collection of urban renewal projects focused on sustainable living and community development.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', ARRAY['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Multiple US Cities', 'residential', NULL, 40000, 25000000, 14500000, '2024-12-31', 8.5, 'AUSD', NULL, 12, 75, 'In Progress', 18, 'Jan 2024', 45, 127, true),

('650e8400-e29b-41d4-a716-446655440002', 'Global Business Centers', 'Premium commercial real estate in major business hubs around the world.', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', ARRAY['https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Global', 'commercial', NULL, 75000, 40000000, 22000000, '2024-06-30', 7.2, 'AUSD', NULL, 8, 45, 'Planning', 24, 'Mar 2024', 32, 89, true),

('650e8400-e29b-41d4-a716-446655440003', 'Leisure & Lifestyle', 'Luxury vacation properties and resorts in the world''s most desirable destinations.', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Resort Destinations', 'residential', NULL, 30000, 35000000, 18000000, '2024-08-31', 10.2, 'AUSD', NULL, 15, 30, 'Approval Pending', 36, 'Jun 2024', 28, 156, false),

-- Individual investment opportunities (what investors see)
('750e8400-e29b-41d4-a716-446655440001', 'Aurelia Bay Resort', 'Luxury resort development with beachfront access and world-class amenities.', '/images/resort-project-1.png', ARRAY['/images/resort-project-1.png', '/images/resort-project-2.png', '/images/resort-project-3.png', '/images/resort-project-4.png'], '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'New York, USA', 'commercial', 1000, 1000, 5000000, 2750000, '2024-12-31', 8.5, 'AUSD', '0x3680FE6cc714d49F8a78e61D901032792b6fa773', 1, 55, 'Construction', 24, 'Jan 2024', 24, 89, true),

('750e8400-e29b-41d4-a716-446655440002', 'Momentum Arena', 'State-of-the-art sports and entertainment complex with multi-purpose facilities.', '/images/stadium-project-1.png', ARRAY['/images/stadium-project-1.png', '/images/stadium-project-2.png', '/images/stadium-project-3.png', '/images/stadium-project-4.png'], '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Portland, USA', 'commercial', 75000, 75000, 3500000, 2100000, '2023-11-15', 7.2, 'AUSD', NULL, 1, 60, 'Construction', 18, 'Mar 2023', 42, 67, true),

('750e8400-e29b-41d4-a716-446655440003', 'Skyline Residences', 'Premium high-rise residential towers with panoramic city views and luxury amenities.', '/images/condo-project-1.png', ARRAY['/images/condo-project-1.png', '/images/condo-project-2.png', '/images/condo-project-3.png', '/images/condo-project-4.png'], '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Singapore', 'residential', 120000, 120000, 8000000, 5400000, '2024-01-20', 9.5, 'AUSD', NULL, 1, 67, 'In Progress', 30, 'Jun 2023', 67, 134, true),

('750e8400-e29b-41d4-a716-446655440004', 'Seaside Villas #23', 'Luxury beachfront properties with private access to the shore and resort-style amenities.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Bali, Indonesia', 'residential', 35000, 35000, 6500000, 1800000, '2024-02-28', 10.2, 'AUSD', NULL, 1, 28, 'Planning', 36, 'Oct 2023', 18, 45, true),

('750e8400-e29b-41d4-a716-446655440005', 'Mountain View Lodges #11', 'Ski-in/ski-out luxury cabins with panoramic mountain views and year-round recreational activities.', 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', ARRAY['https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Aspen, USA', 'residential', 85000, 85000, 4500000, 3200000, '2023-10-30', 8.7, 'AUSD', NULL, 1, 71, 'In Progress', 24, 'Jan 2023', 36, 78, true),

('750e8400-e29b-41d4-a716-446655440006', 'Tech District Offices #01', 'Modern office spaces in the heart of the technology district with smart building features.', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80', ARRAY['https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'], '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'San Francisco, USA', 'commercial', 150000, 150000, 12000000, 7500000, '2024-03-15', 9.8, 'AUSD', NULL, 1, 62, 'In Progress', 36, 'Apr 2023', 52, 156, true);

-- Insert Milestones for projects
INSERT INTO milestones (id, title, date, status, description, project_id) VALUES
-- Milestones for Aurelia Bay Resort
('850e8400-e29b-41d4-a716-446655440001', 'Land Acquisition', '2023-01-15', 'Completed', 'Successfully acquired the land plot for the project.', '750e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440002', 'Architectural Design Finalized', '2023-03-01', 'Completed', 'Finalized the architectural plans and blueprints.', '750e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440003', 'Permits Secured', '2023-05-20', 'Completed', 'Obtained all necessary building permits from local authorities.', '750e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440004', 'Foundation Laid', '2023-08-10', 'In Progress', 'Construction of the building foundation is currently underway.', '750e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440005', 'Structural Framing', '2023-11-01', 'Upcoming', 'Erection of the building''s structural frame.', '750e8400-e29b-41d4-a716-446655440001'),

-- Milestones for Urban Renaissance (project collection)
('850e8400-e29b-41d4-a716-446655440006', 'Project Planning Phase', '2024-01-01', 'Completed', 'Completed comprehensive planning for all 12 properties in the collection.', '650e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440007', 'Site Acquisitions', '2024-03-15', 'In Progress', 'Acquiring land for multiple urban renewal sites.', '650e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440008', 'Construction Phase 1', '2024-06-01', 'Upcoming', 'Begin construction on first 4 properties.', '650e8400-e29b-41d4-a716-446655440001');

-- Insert Documents for projects
INSERT INTO documents (id, name, url, type, uploaded_at, project_id) VALUES
-- Documents for Aurelia Bay Resort
('950e8400-e29b-41d4-a716-446655440001', 'Title Deed', 'https://example.com/docs/aurelia-title-deed.pdf', 'PDF', '2023-01-10', '750e8400-e29b-41d4-a716-446655440001'),
('950e8400-e29b-41d4-a716-446655440002', 'Environmental Report', 'https://example.com/docs/aurelia-environmental.pdf', 'PDF', '2023-02-15', '750e8400-e29b-41d4-a716-446655440001'),
('950e8400-e29b-41d4-a716-446655440003', 'Appraisal Certificate', 'https://example.com/docs/aurelia-appraisal.pdf', 'PDF', '2023-03-05', '750e8400-e29b-41d4-a716-446655440001'),

-- Documents for Urban Renaissance
('950e8400-e29b-41d4-a716-446655440004', 'Master Development Plan', 'https://example.com/docs/urban-renaissance-master-plan.pdf', 'PDF', '2023-12-01', '650e8400-e29b-41d4-a716-446655440001'),
('950e8400-e29b-41d4-a716-446655440005', 'Environmental Impact Study', 'https://example.com/docs/urban-renaissance-environmental.pdf', 'PDF', '2023-12-15', '650e8400-e29b-41d4-a716-446655440001'); 