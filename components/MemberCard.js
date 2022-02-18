import Image from 'next/image';

export default function MemberCard({ member, custPrompt }) {
  let screenName;

  if (member.goes_by) {
    screenName = member.goes_by;
    const secondaryName = member.first_name + ' ' + member.last_name;
  } else {
    screenName = member.first_name + ' ' + member.last_name;
  }

  return (
    <div className='member-card'>
      {member.avatar && (
        <Image
          src={member.avatar}
          alt={`${screenName}'s avatar`}
          width='150'
          height='150'
        />
      )}
      <div>
        <h4>{screenName}</h4>
        {secondaryName && <p>{secondaryName}</p>}
        {member.pronouns && <p>{member.pronouns}</p>}
        {member.location && <p>{member.location}</p>}
        {member.interests && <p>{member.interests}</p>}
        {member.pets && <p>{member.pets}</p>}
      </div>
      {member.custom_answer && (
        <div>
          <p>{custPrompt}</p>
          <p>{member.custom_answer}</p>
        </div>
      )}
    </div>
  );
}
