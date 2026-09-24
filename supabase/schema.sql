-- ==============================================================================
-- APEX ROOFING ESTIMATOR OS (Phase 2 - #57)
-- Commercial & Residential Drone Precision & Insurance Scope Architecture
-- ==============================================================================

-- 1. Roof Estimates Table
CREATE TABLE IF NOT EXISTS roofing_estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    property_address TEXT NOT NULL,
    roof_pitch TEXT NOT NULL DEFAULT '6/12 Standard Pitch',
    square_footage NUMERIC NOT NULL,
    material_spec TEXT NOT NULL DEFAULT 'Standing Seam Architectural Metal',
    estimated_cost NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    drone_scan_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Drone Inspections Table
CREATE TABLE IF NOT EXISTS drone_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES roofing_estimates(id) ON DELETE CASCADE,
    flight_id TEXT NOT NULL UNIQUE,
    pilot_license TEXT NOT NULL,
    orthomosaic_url TEXT NOT NULL,
    hail_damage_detected BOOLEAN DEFAULT false,
    wind_uplift_rating TEXT NOT NULL,
    inspected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Insurance Claims Scope Table
CREATE TABLE IF NOT EXISTS insurance_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES roofing_estimates(id) ON DELETE CASCADE,
    adjuster_name TEXT NOT NULL,
    insurance_carrier TEXT NOT NULL,
    claim_number TEXT NOT NULL,
    approved_payout NUMERIC DEFAULT 0,
    depreciation_withheld NUMERIC DEFAULT 0,
    claim_status TEXT NOT NULL DEFAULT 'in_review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Crew Dispatch & Tear-Off Schedule Table
CREATE TABLE IF NOT EXISTS crew_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES roofing_estimates(id) ON DELETE CASCADE,
    crew_foreman TEXT NOT NULL,
    crew_size INTEGER DEFAULT 6,
    tear_off_date DATE NOT NULL,
    completion_target DATE NOT NULL,
    bin_dumpster_delivered BOOLEAN DEFAULT false,
    weather_clearance BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE roofing_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE drone_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE crew_schedules ENABLE ROW LEVEL SECURITY;

-- POLICIES (Public Demo Access)
CREATE POLICY "Public Read Access roofing_estimates" ON roofing_estimates FOR SELECT USING (true);
CREATE POLICY "Public Write Access roofing_estimates" ON roofing_estimates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Access roofing_estimates" ON roofing_estimates FOR UPDATE USING (true);

CREATE POLICY "Public Read Access drone_inspections" ON drone_inspections FOR SELECT USING (true);
CREATE POLICY "Public Write Access drone_inspections" ON drone_inspections FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access insurance_claims" ON insurance_claims FOR SELECT USING (true);
CREATE POLICY "Public Write Access insurance_claims" ON insurance_claims FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access crew_schedules" ON crew_schedules FOR SELECT USING (true);
CREATE POLICY "Public Write Access crew_schedules" ON crew_schedules FOR INSERT WITH CHECK (true);
