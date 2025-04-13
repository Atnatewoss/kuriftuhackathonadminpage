import json
import math
from datetime import datetime, timedelta

def calculate_points(visit):
    """Calculate points based on visit type and amount spent."""
    base_points = visit['amount']  # 1 point per dollar base rate
    
    # Bonus points multiplier based on activity type
    multipliers = {
        'Hotel': 2.0,      # Encourage longer stays
        'Restaurant': 1.5,  # Promote dining experiences
        'Spa': 1.8,        # Incentivize wellness services
        'Adventure': 2.2    # Highest multiplier for unique experiences
    }
    
    return int(base_points * multipliers.get(visit['type'], 1.0))

def calculate_tier_threshold(points):
    """Determine membership tier based on points."""
    if points >= 50000:
        return "Platinum"
    elif points >= 25000:
        return "Gold"
    elif points >= 10000:
        return "Silver"
    else:
        return "Bronze"

def calculate_rfm_scores(visits):
    """Calculate RFM (Recency, Frequency, Monetary) scores for customer segmentation."""
    now = datetime.now()
    
    sorted_visits = sorted(visits, key=lambda x: datetime.fromisoformat(x['date']))
    
    last_visit = datetime.fromisoformat(sorted_visits[-1]['date'])
    recency = (now - last_visit).days
    frequency = len(visits)
    monetary = sum(visit['amount'] for visit in visits)
    
    r_score = 5 - min(4, math.floor(recency / 30))
    f_score = min(5, math.ceil(frequency / 3))
    m_score = min(5, math.ceil(monetary / 1000))
    
    return (r_score, f_score, m_score)

def predict_churn_risk(rfm_scores, points_trend):
    """Predict churn risk based on RFM scores and points activity."""
    r, f, m = rfm_scores
    
    # Calculate points velocity (change in points over time)
    points_velocity = sum(points_trend) / len(points_trend) if points_trend else 0
    
    # Adjust risk based on points velocity
    velocity_factor = 0.8 if points_velocity > 0 else 1.2
    
    # Base risk calculation
    weighted_score = (r * 0.4) + (f * 0.3) + (m * 0.3)
    base_risk = max(0.1, min(0.9, (6 - weighted_score) / 5))
    
    # Adjust risk based on points activity
    return max(0.1, min(0.9, base_risk * velocity_factor))

def generate_tier_benefits(tier):
    """Generate tier-specific benefits and rewards."""
    benefits = {
        "Platinum": [
            "50% bonus points on all stays",
            "Complimentary room upgrades",
            "Priority spa appointments",
            "Exclusive access to premium events",
            "Personal concierge service"
        ],
        "Gold": [
            "25% bonus points on all stays",
            "Early check-in and late check-out",
            "Spa treatment discounts",
            "Quarterly bonus rewards",
            "Priority restaurant reservations"
        ],
        "Silver": [
            "10% bonus points on all stays",
            "Welcome drink on arrival",
            "Basic room upgrades when available",
            "Monthly special offers"
        ],
        "Bronze": [
            "Standard points earning",
            "Member-only rates",
            "Special birthday offer"
        ]
    }
    return benefits.get(tier, [])

def analyze_member(member):
    """Perform comprehensive analysis for a member."""
    # Calculate total points from visit history
    total_points = sum(calculate_points(visit) for visit in member['visitHistory'])
    
    # Calculate points trend (last 3 visits)
    points_trend = [calculate_points(visit) for visit in sorted(
        member['visitHistory'],
        key=lambda x: datetime.fromisoformat(x['date']),
        reverse=True
    )[:3]]
    
    # Determine appropriate tier based on points
    recommended_tier = calculate_tier_threshold(total_points)
    
    # Calculate RFM scores
    rfm_scores = calculate_rfm_scores(member['visitHistory'])
    
    # Enhanced churn prediction using points data
    churn_risk = predict_churn_risk(rfm_scores, points_trend)
    
    # Generate tier-specific benefits
    tier_benefits = generate_tier_benefits(recommended_tier)
    
    # Analyze visit patterns
    visit_types = {}
    for visit in member['visitHistory']:
        visit_types[visit['type']] = visit_types.get(visit['type'], 0) + 1
    
    preferred_services = sorted(
        visit_types.items(),
        key=lambda x: x[1],
        reverse=True
    )
    
    # Generate personalized recommendations
    recommendations = []
    if preferred_services:
        top_service = preferred_services[0][0]
        recommendations.append(f"Earn double points on your next {top_service} visit")
        if len(preferred_services) > 1:
            second_service = preferred_services[1][0]
            recommendations.append(f"Try our new {second_service} experience to earn bonus points")
    
    if churn_risk > 0.5:
        recommendations.append("Special 2X points promotion on your next stay")
    
    # Points forecast
    avg_monthly_points = total_points / max(1, len(member['visitHistory']))
    points_to_next_tier = 0
    next_tier = None
    
    if recommended_tier == "Bronze":
        points_to_next_tier = 10000 - total_points
        next_tier = "Silver"
    elif recommended_tier == "Silver":
        points_to_next_tier = 25000 - total_points
        next_tier = "Gold"
    elif recommended_tier == "Gold":
        points_to_next_tier = 50000 - total_points
        next_tier = "Platinum"
    
    months_to_next_tier = math.ceil(points_to_next_tier / avg_monthly_points) if avg_monthly_points > 0 else None
    
    return {
        "memberId": member['id'],
        "currentPoints": total_points,
        "recommendedTier": recommended_tier,
        "currentTier": member['tier'],
        "tierBenefits": tier_benefits,
        "churnRisk": churn_risk,
        "recommendations": recommendations,
        "pointsTrend": points_trend,
        "preferredServices": [service[0] for service in preferred_services],
        "nextTierProgress": {
            "nextTier": next_tier,
            "pointsNeeded": points_to_next_tier if next_tier else 0,
            "estimatedMonthsToNextTier": months_to_next_tier
        }
    }

# Load mock data and perform analysis
with open('src/data/mockMembers.json', 'r') as f:
    data = json.load(f)
    members = data['members']

# Analyze each member
analysis_results = [analyze_member(member) for member in members]

# Save results
with open('src/data/analysis_results.json', 'w') as f:
    json.dump(analysis_results, f, indent=2)