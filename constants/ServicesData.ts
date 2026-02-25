export const SERVICES = [
    { id: 8, name: 'Appliances', icon: 'washing-machine', color: '#EFF6FF', iconColor: '#3B82F6', type: 'material' },
    { id: 1, name: 'AC Service', icon: 'snowflake', color: '#E0F2FE', iconColor: '#38BDF8', type: 'material' },
    { id: 2, name: 'Cleaning', icon: 'broom', color: '#F5F3FF', iconColor: '#8B5CF6', type: 'material' },
    { id: 3, name: 'Plumbing', icon: 'water-pump', color: '#ECFDF5', iconColor: '#10B981', type: 'material' },
    { id: 4, name: 'Electrician', icon: 'lightbulb-on', color: '#FFFBEB', iconColor: '#F59E0B', type: 'material' },
    { id: 5, name: 'Painting', icon: 'palette', color: '#FFF1F2', iconColor: '#FB7185', type: 'material' },
    { id: 6, name: 'Carpenter', icon: 'hammer', color: '#F8FAFC', iconColor: '#475569', type: 'material' },
    { id: 7, name: 'Home Repair', icon: 'tools', color: '#FFF7ED', iconColor: '#FB923C', type: 'material' },
    { id: 9, name: 'Automotive', icon: 'car-wrench', color: '#F8FAFC', iconColor: '#64748B', type: 'material' },
    { id: 10, name: 'Beauty', icon: 'face-woman', color: '#FDF2F8', iconColor: '#EC4899', type: 'material' },
    { id: 11, name: 'Education', icon: 'school', color: '#F0FDF4', iconColor: '#22C55E', type: 'material' },
    { id: 12, name: 'IT Services', icon: 'laptop', color: '#F5F3FF', iconColor: '#8B5CF6', type: 'material' },
    { id: 13, name: 'Events', icon: 'party-popper', color: '#FFF1F2', iconColor: '#F43F5E', type: 'material' },
    { id: 14, name: 'Moving', icon: 'truck-delivery', color: '#FEFCE8', iconColor: '#EAB308', type: 'material' },
    { id: 15, name: 'Emergency', icon: 'alert-decagram', color: '#FEF2F2', iconColor: '#EF4444', type: 'material' },
];

export const SUB_SERVICES: Record<string, any[]> = {
    'Appliances': [
        { id: 101, name: 'TV Repair', icon: 'television-classic', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 102, name: 'Microwave', icon: 'microwave', color: '#F0F9FF', iconColor: '#0284C7' },
        { id: 103, name: 'RO Service', icon: 'water-filter', color: '#ECFDF5', iconColor: '#059669' },
        { id: 104, name: 'Geyser', icon: 'hot-tub', color: '#FFF7ED', iconColor: '#EA580C' },
    ],
    'AC Service': [
        { id: 201, name: 'Gas Refill', icon: 'gas-cylinder', color: '#F0FDF4', iconColor: '#22C55E' },
        { id: 202, name: 'Deep Clean', icon: 'air-filter', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 203, name: 'Installation', icon: 'tools', color: '#FFFBEB', iconColor: '#F59E0B' },
        { id: 204, name: 'Repair & Fix', icon: 'wrench-outline', color: '#FFF1F2', iconColor: '#F43F5E' },
    ],
    'Cleaning': [
        { id: 301, name: 'Full House', icon: 'home-clean', color: '#F5F3FF', iconColor: '#8B5CF6' },
        { id: 302, name: 'Bathroom', icon: 'shower', color: '#ECFDF5', iconColor: '#10B981' },
        { id: 303, name: 'Kitchen', icon: 'chef-hat', color: '#FFFBEB', iconColor: '#F59E0B' },
        { id: 304, name: 'Sofa/Carpet', icon: 'sofa', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 305, name: 'Balcony', icon: 'flower-outline', color: '#F0FDF4', iconColor: '#22C55E' },
        { id: 306, name: 'Windows', icon: 'window-maximize', color: '#FEF2F2', iconColor: '#EF4444' },
    ],
    'Plumbing': [
        { id: 401, name: 'Tap & Mixer', icon: 'water-pump', color: '#E0F2FE', iconColor: '#0EA5E9' },
        { id: 402, name: 'Pipe Leakage', icon: 'pipe-leak', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 403, name: 'Toilet/Bath', icon: 'toilet', color: '#F8FAFC', iconColor: '#64748B' },
        { id: 404, name: 'Water Tank', icon: 'tank', color: '#ECFDF5', iconColor: '#10B981' },
        { id: 405, name: 'Sanitary', icon: 'wrench-outline', color: '#FFF7ED', iconColor: '#EA580C' },
    ],
    'Electrician': [
        { id: 501, name: 'Fan Repair', icon: 'fan', color: '#FFFBEB', iconColor: '#F59E0B' },
        { id: 502, name: 'Switch/Socket', icon: 'power-socket-eu', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 503, name: 'Wiring/MCB', icon: 'expansion-card', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 504, name: 'Lights', icon: 'lightbulb-outline', color: '#FDF2F8', iconColor: '#DB2777' },
    ],
    'Painting': [
        { id: 601, name: 'Full Home', icon: 'home-modern', color: '#F5F3FF', iconColor: '#8B5CF6' },
        { id: 602, name: 'Interior', icon: 'format-paint', color: '#ECFDF5', iconColor: '#10B981' },
        { id: 603, name: 'Texture', icon: 'texture-box', color: '#FFF1F2', iconColor: '#FB7185' },
        { id: 604, name: 'Wood Polish', icon: 'brush', color: '#FEFCE8', iconColor: '#EAB308' },
    ],
    'Carpenter': [
        { id: 701, name: 'Furniture Repair', icon: 'hammer-wrench', color: '#F8FAFC', iconColor: '#475569' },
        { id: 702, name: 'Door/Window', icon: 'door-open', color: '#FFF7ED', iconColor: '#EA580C' },
        { id: 703, name: 'Lock/Hinge', icon: 'lock-cog', color: '#F0F9FF', iconColor: '#0369A1' },
        { id: 704, name: 'New Assembly', icon: 'wardrobe-outline', color: '#F5F3FF', iconColor: '#7C3AED' },
    ],
    'Home Repair': [
        { id: 801, name: 'Tiles & Stone', icon: 'wall', color: '#F0F9FF', iconColor: '#0284C7' },
        { id: 802, name: 'POP & Gypsum', icon: 'format-paint', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 803, name: 'Waterproofing', icon: 'water-off', color: '#ECFDF5', iconColor: '#059669' },
        { id: 804, name: 'Drill & Hang', icon: 'drill', color: '#FFFBEB', iconColor: '#D97706' },
    ],
    'Automotive': [
        { id: 901, name: 'Car Wash', icon: 'car-wash', color: '#E0F2FE', iconColor: '#0EA5E9' },
        { id: 902, name: 'Full Service', icon: 'car-cog', color: '#F8FAFC', iconColor: '#475569' },
        { id: 903, name: 'Battery', icon: 'battery-charging-100', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 904, name: 'Tires/Wheels', icon: 'tire', color: '#F0FDF4', iconColor: '#22C55E' },
    ],
    'Beauty': [
        { id: 1001, name: 'Salon at Home', icon: 'face-woman-shimmer', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 1002, name: 'Facial/Cleanup', icon: 'spa', color: '#ECFDF5', iconColor: '#059669' },
        { id: 1003, name: 'Mani-Pedi', icon: 'hand-wave', color: '#FFFBEB', iconColor: '#D97706' },
        { id: 1004, name: 'Hair Styling', icon: 'content-cut', color: '#F5F3FF', iconColor: '#7C3AED' },
    ],
    'Education': [
        { id: 1101, name: 'Home Tutors', icon: 'book-open-variant', color: '#EEF2FF', iconColor: '#4F46E5' },
        { id: 1102, name: 'Languages', icon: 'translate', color: '#F0FDF4', iconColor: '#16A34A' },
        { id: 1103, name: 'Coding/STEM', icon: 'code-braces', color: '#FAFAF9', iconColor: '#44403C' },
        { id: 1104, name: 'Music/Arts', icon: 'music-clef-treble', color: '#FFF1F2', iconColor: '#E11D48' },
    ],
    'IT Services': [
        { id: 1201, name: 'Laptop Repair', icon: 'laptop-off', color: '#F0F9FF', iconColor: '#0369A1' },
        { id: 1202, name: 'Software', icon: 'microsoft-windows', color: '#EEF2FF', iconColor: '#4F46E5' },
        { id: 1203, name: 'WiFi/Network', icon: 'wifi-cog', color: '#F0FDF4', iconColor: '#16A34A' },
        { id: 1204, name: 'Data Recovery', icon: 'database-search', color: '#FFF7ED', iconColor: '#EA580C' },
    ],
    'Events': [
        { id: 1301, name: 'Decoration', icon: 'balloon', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 1302, name: 'Photography', icon: 'camera-iris', color: '#F8FAFC', iconColor: '#475569' },
        { id: 1303, name: 'Catering', icon: 'silverware-fork-knife', color: '#FFFBEB', iconColor: '#D97706' },
        { id: 1304, name: 'DJ & Sound', icon: 'speaker-group', color: '#F5F3FF', iconColor: '#7C3AED' },
    ],
    'Moving': [
        { id: 1401, name: 'Packers & Movers', icon: 'truck-check', color: '#EEF2FF', iconColor: '#4F46E5' },
        { id: 1402, name: 'Furniture Shift', icon: 'sofa-single-outline', color: '#FDF2F8', iconColor: '#DB2777' },
        { id: 1403, name: 'Bike Transport', icon: 'motorbike', color: '#F0FDF4', iconColor: '#16A34A' },
        { id: 1404, name: 'Rent a Tempo', icon: 'truck-fast', color: '#FFFBEB', iconColor: '#D97706' },
    ],
    'Emergency': [
        { id: 1501, name: 'Locksmith', icon: 'key-alert', color: '#FEF2F2', iconColor: '#EF4444' },
        { id: 1502, name: 'Spark/Fire', icon: 'fire-circle', color: '#FFF1F2', iconColor: '#F43F5E' },
        { id: 1503, name: 'Major Leakage', icon: 'water-alert', color: '#EFF6FF', iconColor: '#3B82F6' },
        { id: 1504, name: 'SOS Help', icon: 'shield-alert', color: '#F8FAFC', iconColor: '#1E293B' },
    ],
};

export const OFFERS = [
    { id: 1, color: '#DBEAFE', title: '50% OFF', subtitle: 'On your first AC service' },
    { id: 2, color: '#FCE7F3', title: 'Flat ₹200 OFF', subtitle: 'On full house cleaning' },
    { id: 3, color: '#FEF3C7', title: 'Free Inspection', subtitle: 'On all plumbing works' },
];
