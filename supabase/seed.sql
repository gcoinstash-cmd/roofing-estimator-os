-- SEED DATA FOR APEX ROOFING ESTIMATOR OS
INSERT INTO roofing_estimates (id, client_name, client_email, property_address, roof_pitch, square_footage, material_spec, estimated_cost, status, drone_scan_verified)
VALUES
('b1111111-1111-1111-1111-111111111111', 'Vance Montgomery', 'vance@apexlogistics.com', '4400 Industrial Parkway, Austin TX', '4/12 Low Slope', 18500, 'Standing Seam Kynar 500 Metal', 184500.00, 'approved', true),
('b2222222-2222-2222-2222-222222222222', 'Elena Rostova', 'elena@rostovaholdings.com', '1202 Highland Ridge Dr, Westlake TX', '9/12 Steep Architectural', 5800, 'Hand-Split Vermont Slate', 76200.00, 'under_review', true),
('b3333333-3333-3333-3333-333333333333', 'Marcus Thorne', 'm.thorne@skylinebiotech.io', '884 Capital Commons Blvd, Round Rock TX', 'Flat TPO 80-mil', 24000, 'Carlisle Sure-Weld TPO Membrane', 142000.00, 'scheduled', true);

INSERT INTO drone_inspections (estimate_id, flight_id, pilot_license, orthomosaic_url, hail_damage_detected, wind_uplift_rating)
VALUES
('b1111111-1111-1111-1111-111111111111', 'UAV-FLIGHT-9081', 'FAA-PART-107-TX-9941', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', true, 'UL-90 Class 4'),
('b2222222-2222-2222-2222-222222222222', 'UAV-FLIGHT-9082', 'FAA-PART-107-TX-8812', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', false, 'FM Global 1-120'),
('b3333333-3333-3333-3333-333333333333', 'UAV-FLIGHT-9083', 'FAA-PART-107-TX-9941', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', true, 'UL-90 Class 4');

INSERT INTO insurance_claims (estimate_id, adjuster_name, insurance_carrier, claim_number, approved_payout, depreciation_withheld, claim_status)
VALUES
('b1111111-1111-1111-1111-111111111111', 'Donald Sterling', 'Travelers Commercial', 'CLM-2026-99210-TX', 172000.00, 12500.00, 'approved'),
('b2222222-2222-2222-2222-222222222222', 'Sarah Jenkins', 'Chubb High-Value Residential', 'CHB-2026-44018', 76200.00, 0.00, 'settled'),
('b3333333-3333-3333-3333-333333333333', 'Robert Calder', 'Liberty Mutual Commercial', 'LBM-88401-2026', 135000.00, 7000.00, 'in_review');

INSERT INTO crew_schedules (estimate_id, crew_foreman, crew_size, tear_off_date, completion_target, bin_dumpster_delivered, weather_clearance)
VALUES
('b1111111-1111-1111-1111-111111111111', 'Hector Morales', 8, '2026-10-05', '2026-10-12', true, true),
('b2222222-2222-2222-2222-222222222222', 'Julian Drake', 6, '2026-10-14', '2026-10-20', false, true),
('b3333333-3333-3333-3333-333333333333', 'Hector Morales', 10, '2026-10-22', '2026-11-01', true, true);
